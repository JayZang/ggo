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

    public withIdCondition(id: number | string) {
        this.queryBuilder.andWhere(`${this.entityAlias}.${this.ID} = :id`, {  id })
        return this
    }

    public withCreateAtOrder(order: "ASC" | "DESC" = 'ASC') {
        this.queryBuilder.orderBy(`${this.entityAlias}.${this.CREATE_AT}`, order)
        return this
    }
}