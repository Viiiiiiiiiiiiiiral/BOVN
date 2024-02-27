import { Controller, Query } from '@nestjs/common';
import { QueryParamBaseDto } from 'src/common/dto/query-param.dto';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  list(@Query() query: QueryParamBaseDto) {
    return this.userService.list(query);
  }
}
