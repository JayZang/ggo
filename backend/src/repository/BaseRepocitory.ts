import { Repository, SelectQueryBuilder } from "typeorm";

export class BaseRepository<T> extends Repository<T> {
    protected queryBuilder: SelectQueryBuilder<T>
    protected entityAlias: string = 'entity'
    protected CREATE_AT = 'create_at'
    protected UPDATE_AT = 'update_at'

    public initQueryBuilder() {
        this.refreshQueryBuilder()
        return this
    }

    public refreshQueryBuilder(): void {
        this.queryBuilder = this.createQueryBuilder(this.entityAlias)
    }

    public getMany() {
        return this.queryBuilder.printSql().getMany()
    }

    public getOne() {
        return this.queryBuilder.getOne()
    }

    public withCreateAtOrder(order: "ASC" | "DESC" = 'ASC') {
        this.queryBuilder.orderBy(`${this.entityAlias}.${this.CREATE_AT}`, order)
        return this
    }
}