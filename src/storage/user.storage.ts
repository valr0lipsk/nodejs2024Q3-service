import { Injectable } from '@nestjs/common';
import { Storage } from 'src/lib/classes/base-storage';
import { CreateUserDto, UpdatePasswordDto } from 'src/user/interfaces/dto';
import { User } from 'src/user/interfaces/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserStorage extends Storage<
  User,
  CreateUserDto,
  UpdatePasswordDto,
  'password'
> {
  constructor() {
    super();
    this.entities = [
      {
        id: '3b935613-581b-4466-9a88-143bc02497b8',
        login: 'John Doe',
        password: 'john@example.com',
        version: 1,
        createdAt: 1,
        updatedAt: 1,
      },
      {
        id: '24139432-a1b9-429b-9fda-a97b99fbf26e',
        login: 'Jane Doe',
        password: 'jane@example.com',
        version: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    ];
  }

  create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user: User = {
      id: uuid(),
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    this.entities.push(user);
    const { password: _, ...userResponse } = user;

    return Promise.resolve(userResponse);
  }

  update(id: string, data: UpdatePasswordDto): Promise<Omit<User, 'password'>> {
    const index = this.entities.findIndex((el) => el.id === id);
    if (index === -1) return undefined;

    const current = this.entities[index];

    if (current.password !== data.oldPassword) {
      return Promise.resolve({ id: undefined } as unknown as User);
    }
    const user: User = {
      ...current,
      password: data.newPassword,
      updatedAt: Date.now(),
      version: ++current.version,
    };

    this.entities[index] = user;
    const { password: _, ...userResponse } = user;
    return Promise.resolve(userResponse);
  }
}
