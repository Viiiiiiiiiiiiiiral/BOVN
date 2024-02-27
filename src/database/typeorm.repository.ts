import { IPaginateParams } from 'src/common/dto/app.interface';
import {
  BaseEntity,
  FindManyOptions,
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';

export class TypeOrmRepository<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  update(
    id: string | number | string[] | number[] | FindOptionsWhere<T>,
    data: any,
  ): Promise<any> {
    return this.repository.update(id, data);
  }

  findExistedRecord() {
    return this.repository.find({
      take: 1,
    });
  }

  async findAllByConditions(
    conditions: FindOptionsWhere<T>,
    paginateParams: IPaginateParams,
    select?: FindOptionsSelect<T>,
    join?: string[],
    deletedAt: boolean = true,
  ) {
    const page =
      paginateParams.page && paginateParams.page > 0
        ? Number(paginateParams.page)
        : 1;
    const pageSize =
      paginateParams.pageSize && paginateParams.pageSize > 0
        ? Number(paginateParams.pageSize)
        : 20;

    const paramFinds: FindManyOptions = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: conditions,
      withDeleted: paginateParams?.ignoreDeleted === 'true' ? false : true, // display record deleted_at IS NOT NULL
      // cache: 2000, // 2s
    };
    if (join) {
      paramFinds.relations = join;
    }
    paramFinds.order = {};
    if (deletedAt && paginateParams?.ignoreDeleted !== 'true') {
      paramFinds.order.deletedAt = 'DESC';
    }
    if (paginateParams.sortBy) {
      paramFinds.order[paginateParams.sortBy] =
        paginateParams.sortOrder == 'desc' ? 'DESC' : 'ASC';
    }
    if (select) {
      paramFinds.select = select;
    }
    const [data, total] = await this.repository.findAndCount(paramFinds);
    const totalPage =
      total % pageSize == 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;
    return {
      data,
      total,
      page,
      pageSize,
      totalPage,
    };
  }

  async findByPaginationBuilder(
    paginateParams: IPaginateParams,
    builder: SelectQueryBuilder<T>,
  ) {
    const page =
      paginateParams.page && paginateParams.page > 0
        ? Number(paginateParams.page)
        : 1;
    const pageSize =
      paginateParams.pageSize && paginateParams.pageSize > 0
        ? Number(paginateParams.pageSize)
        : 20;
    const [total, data] = await Promise.all([
      builder.getCount(),
      builder
        .offset((page - 1) * pageSize)
        .limit(pageSize)
        .getRawMany(),
    ]);
    const totalPage =
      total % pageSize == 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;

    return {
      data,
      total,
      page,
      pageSize,
      totalPage,
    };
  }

  findOneCondition(conditions: FindOneOptions): Promise<T> {
    return this.repository.findOne(conditions);
  }

  findOneWhere(where: FindOptionsWhere<T>): Promise<T> {
    return this.repository.findOneBy(where);
  }

  count(conditions: FindManyOptions): Promise<number> {
    return this.repository.count(conditions);
  }

  countBy(where: FindOptionsWhere<T>): Promise<number> {
    return this.repository.countBy(where);
  }

  softDelete(
    conditions:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | FindOptionsWhere<T>,
  ): Promise<UpdateResult> {
    return this.repository.softDelete(conditions);
  }

  restore(
    conditions:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | FindOptionsWhere<T>,
  ): Promise<UpdateResult> {
    return this.repository.restore(conditions);
  }
}
