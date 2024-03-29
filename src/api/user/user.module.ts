import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { userProvider } from './user.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...userProvider],
  exports: [UserService],
})
export class UserModule {}
