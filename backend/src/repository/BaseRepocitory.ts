import { Repository, SelectQueryBuilder } from "typeorm";

export class BaseRepository<T> extends Repository<T> {
    protected queryBuilder: SelectQueryBuilder<T>
    protected entityAlias: string = 'entity'
    protected ID = 'id'
    protected CREATE_AT = 'create_at'
    protected UPDATE_AT = 'update_at'

    public initQueryBuilder() {
        this.refreshQueryBuilder()
        return this
    }

    public refreshQueryBuilder(): void {
        this.queryBuilder = this.createQueryBuilder(this.entityAlias)
    }

    public limit(take: number) {
        this.queryBuilder.limit(take)
        return this
    }

    public offset(offset: number) {
        this.queryBuilder.offset(offset)
        return this
    }

    public getManyAndCount() {
        return this.queryBuilder.getManyAndCount()
    }

    public getMany() {
        return this.queryBuilder.getMany()
    }

    public getOne() {
        return this.queryBuilder.getOne()
    }

    public getCount() {
        return this.queryBuilder.getCount()
    }

    public withFieldCondition(field: string, value: any, type: 'AND' | 'OR' = 'AND') {
        if (type === 'AND')
            this.queryBuilder.andWhere(`${this.entityAlias}.${field} = :${field}`, { [field]: value })
        else
            this.queryBuilder.orWhere(`${this.entityAlias}.${field} = :${field}`, { [field]: value })
        return this
    }

    public withIdCondition(id: number | string) {
        this.queryBuilder.andWhere(`${this.entityAlias}.${this.ID} = :id`, { id })
        return this
    }

    /**
     * Warning: system will be error if length of ids is 0
     */
    public withIdsCondition(ids: number[] | string[]) {
        this.queryBuilder.andWhere(`${this.entityAlias}.${this.ID} IN (:ids)`, { ids })
        return this
    }

    public withCreateAtOrder(order: "ASC" | "DESC" = 'ASC') {
        this.queryBuilder.orderBy(`${this.entityAlias}.${this.CREATE_AT}`, order)
        return this
    }
}