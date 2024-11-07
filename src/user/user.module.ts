import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserStorage } from 'src/storage/user.storage';

@Module({
  controllers: [UserController],
  providers: [UserService, UserStorage],
})
export class UserModule {}
