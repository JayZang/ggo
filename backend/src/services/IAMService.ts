import { getCustomRepository, Not } from 'typeorm'
import Container, { Service } from 'typedi'
import bcryptjs from 'bcryptjs'
import _ from 'lodash'
import xlsx from 'node-xlsx'

import PolicyRepo from '@/repository/PolicyRepository'
import GroupRepo from '@/repository/GroupRepository'
import UserRepo from '@/repository/UserRepository'
import User, { UserIdentityType } from '@/entity/User'
import MemberRepo from '@/repository/MemberRepository'
import { makeRandomString } from '@/utils/makeRandomString'
import moment from 'moment'
import AuthService from './AuthService'

const authService = Container.get(AuthService)

@Service()
export default class IAMService {

    /**
     * Get iam policies
     */
    public async getPolicies() {
        try {
            const policyRepo = getCustomRepository(PolicyRepo)
            return await policyRepo.find()
        } catch (err) {
            console.log(err)
            console.log('Get iam policies error')
            return null
        }
    }

    /**
     * Get iam groups
     */
    public async getGroups() {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            return await groupRepo.findWithPolicies()
        } catch (err) {
            console.log(err)
            console.log('Get iam groups error')
            return null
        }
    }

    /**
     * Create iam group
     */
    public async createGroup(data: any) {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            const policyRepo = getCustomRepository(PolicyRepo)
            const policies = await policyRepo.findByIds(data.policy_ids)
            const group =  groupRepo.create({
                name: data.name,
                description: data.description || null,
                policies
            })
            return await groupRepo.save(group)
        } catch (err) {
            console.log(err)
            console.log('Create iam group error')
            return null
        }
    }

    /**
     * Update iam group
     */
    public async updateGroup(id: string | number, data: any) {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            const policyRepo = getCustomRepository(PolicyRepo)
            const group =  await groupRepo.findOneOrFail(id)
            const policies = await policyRepo.findByIds(data.policy_ids)
            group.name = data.name
            group.description = data.description || null
            group.policies = policies
            return await groupRepo.save(group)
        } catch (err) {
            console.log(err)
            console.log('Update iam group error')
            return null
        }
    }

    /**
     * Delete iam group
     */
    public async deleteGroup(ids: string[] | number[]) {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            const groups =  await groupRepo.findByIds(ids)
            await groupRepo.remove(groups)
            return groups
        } catch (err) {
            console.log(err)
            console.log('Delete iam group error')
            return null
        }
    }

    /**
     * Get iam users
     */
    public async getUsers(option?: {
        skip: number,
        take: number,
    }) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            return await userRepo.findAndCount({
                ...option,
                relations: [
                    'policies',
                    'groups',
                    'groups.policies',
                ],
                where: {
                    identity_type: Not(UserIdentityType.admin)
                },
                order: {
                    create_at: 'DESC'
                }
            }).then(async ([users, count]) => {
                return [
                    await userRepo.attachIdentity(users),
                    count
                ] as [User[], number]
            })
        } catch (err) {
            console.log(err)
            console.log('Get iam users error')
            return null
        }
    }

    /**
     * Create iam user
     */
    public async createUser(data: any) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const existUser = await userRepo.findOne({
                identity_type: data.identity_type,
                identity_id: data.identity_id
            })

            if (existUser) throw Error('Can not create more than one user for a identity')

            const identity = await this.getIdentity(
                parseInt(data.identity_type), 
                data.identity_id
            )

            const [
                password,
                hashedPassword
            ] = this.generatePassword()
            const user =  userRepo.create({
                account_id: data.account_id || identity.email,
                password: hashedPassword,
                identity_type: data.identity_type,
                identity_id: data.identity_id
            })
            
            await userRepo.save(user)
            user.identity = identity
            user.password = undefined
            return this.buildUserProfileXlsx(identity.name, user, password)
        } catch (err) {
            console.log(err)
            console.log('Create iam user error')
            return null
        }
    }

    /**
     * Set iam user loginable
     */
    public async setUserLoginable(id: string | number, loginable: boolean) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const user = await userRepo.findOneOrFail(id, {
                where: {
                    identity_type: Not(UserIdentityType.admin)
                }
            })
            user.loginable = loginable

            if (!loginable)
                await authService.logoutUser(user.id)

            return userRepo.save(user)
        } catch (err) {
            console.log(err)
            console.log('Set iam user loginable error')
            return null
        }
    }

    /**
     * Update user's policy and group
     */
    public async updateUserPolicies(id: string | number, data: {
        policyIds: string[] | number[]
        groupIds: string[] | number[]
    }) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const groupRepo = getCustomRepository(GroupRepo)
            const policyRepo = getCustomRepository(PolicyRepo)
            const user = await userRepo.findOneOrFail(id, {
                where: {
                    identity_type: Not(UserIdentityType.admin)
                }
            })
            const [
                policies,
                groups,
                identity
            ] = await Promise.all([
                data.policyIds ? policyRepo.findByIds(data.policyIds) : [],
                data.groupIds ? groupRepo.findByIds(data.groupIds, {
                    relations: ['policies']
                }) : [],
                this.getIdentity(
                    user.identity_type,
                    user.identity_id
                )
            ])

            user.policies = policies
            user.groups = groups
            user.identity = identity

            await authService.logoutUser(user.id)
            return await userRepo.save(user)
        } catch (err) {
            console.log(err)
            console.log('Update user\'s policy and group error')
            return null
        }
    }

    /**
     * Delete iam users
     */
    public async deleteUsers(ids: string[] | number[]) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const users = await userRepo.findByIds(ids)
            await Promise.all(
                users.map(user => authService.logoutUser(user.id))
            )
            await userRepo.remove(users)
            return users
        } catch (err) {
            console.log(err)
            console.log('Delete iam uers error')
            return null
        }
    }

    /**
     * Reset user password
     */
    public async resetUserPassword(id: number | string) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const user = await userRepo.findOneOrFail(id)
            const identity = await this.getIdentity(user.identity_type, user.identity_id)
            const [
                password,
                hashedPassword
            ] = this.generatePassword()
            user.password = hashedPassword
            await authService.logoutUser(user.id)
            await userRepo.save(user)
            return this.buildUserProfileXlsx(identity.name, user, password)
        } catch (err) {
            console.log(err)
            console.log('Reset user password error')
            return null
        }
    }

    /**
     *Generate password (pure and hashed)
     */
    private generatePassword(): [string, string] {
        const password = makeRandomString(10)
        const hashedPassword = bcryptjs.hashSync(
            password,
            bcryptjs.genSaltSync(10)
        )

        return [
            password,
            hashedPassword
        ]
    }

    /**
     * Get identity
     */
    private async getIdentity(identity_type: UserIdentityType, identity_id: string | number) {
        const memberRepo = getCustomRepository(MemberRepo)

        switch (identity_type) {
            case UserIdentityType.member:
                return memberRepo.findOneOrFail(identity_id)

            default:
                throw Error('Search invalid user identity type !')
        }
    }

    private buildUserProfileXlsx(name: string, user: User, pwd: string) {
        let identityName: string

        switch (user.identity_type) {
            case UserIdentityType.member:
                identityName = '成員'
                break
            default:
                identityName = ''
        }

        return xlsx.build([{
            name: '使用者資訊',
            data: [
                ['身份', '名稱', '帳號', '密碼', '密碼生成/變更日期'],
                [identityName, name, user.account_id, pwd, moment().format('YYYY-MM-DD HH:mm')]
            ]
        }])
    }
}