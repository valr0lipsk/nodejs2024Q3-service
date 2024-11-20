import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserStorage } from 'src/storage/user.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './interfaces/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserStorage],
  exports: [UserStorage],
})
export class UserModule {}
