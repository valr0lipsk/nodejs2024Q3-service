import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './interfaces/dto';
import { UserStorage } from 'src/storage/user.storage';

@Injectable()
export class UserService {
  constructor(private readonly storage: UserStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
