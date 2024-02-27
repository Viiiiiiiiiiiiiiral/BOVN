import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { QueryParamBaseDto } from 'src/common/dto/query-param.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('DATABASE_CONNECTION') private dataSource: DataSource,
  ) {}

  public async list(query: QueryParamBaseDto) {
    return this.userRepository.findAllByConditions({}, query);
  }
}
