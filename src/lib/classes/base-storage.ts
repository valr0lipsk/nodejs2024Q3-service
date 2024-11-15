import { BaseEntity } from '../types/base-entity.interface';
import { BaseStorage } from '../types/base-storage.interface';
import { v4 as uuid } from 'uuid';
import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class Storage<
  T extends BaseEntity,
  C,
  U,
  K extends keyof T = never,
> implements BaseStorage<T, C, U, K>
{
  constructor(protected repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T | undefined> {
    const where = { id: id } as FindOptionsWhere<T>;
    return this.repository.findOneBy(where);
  }
  async create(data: C): Promise<Omit<T, K> | T | null> {
    const e = {
      ...data,
      id: uuid(),
    } as unknown as T;
    const entity = this.repository.create(e);

    this.repository.save(entity);
    return entity;
  }

  async update(id: string, data: U): Promise<Omit<T, K> | T | null> {
    // @ts-ignore
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
