import { LineOperationState } from "@/contract/line"
import { client as redisClient } from '@/loaders/redis'

export class LineBotHelper {
    static async checkOperationState(userId: string, state: string): Promise<boolean> {
        return await this.getOperationState(userId )=== state
    }

    static async getOperationState(userId: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            redisClient.get(`line-user-operation-state:${userId}`, (err, state) => {
                if (err) reject(err)
                resolve(state || LineOperationState.NONE)
            })
        })
    }

    /**
     * @param duration seconds
     */
    static async setOperationState(userId: string, state: string, duration: number = 60) {
        return new Promise((resolve, reject) => {
            redisClient.set(`line-user-operation-state:${userId}`, state, 'EX', duration, err => {
                if (err) reject(err)
                resolve()
            })
        })
    }
}