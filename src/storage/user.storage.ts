import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from 'src/lib/classes/base-storage';
import { CreateUserDto, UpdatePasswordDto } from 'src/user/interfaces/dto';
import { User } from 'src/user/interfaces/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserStorage extends Storage<
  User,
  CreateUserDto,
  UpdatePasswordDto,
  'password'
> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = this.repository.create({
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });

    await this.repository.save(user);
    const { password: _, ...userResponse } = user;
    return userResponse;
  }

  async update(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const current = await this.repository.findOne({ where: { id } });
    if (!current) return undefined;

    if (current.password !== data.oldPassword) {
      return { id: undefined } as unknown as User;
    }

    const updated = await this.repository.save({
      ...current,
      password: data.newPassword,
      updatedAt: Date.now(),
      createdAt: +current.createdAt, // a hack because typeorm bigint always returns as a string
      version: ++current.version,
    });

    const { password: _, ...userResponse } = updated;

    return userResponse;
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.repository.findOne({ where: { login } });
  }
}
