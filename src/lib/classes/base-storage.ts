import { BaseEntity } from '../types/base-entity.interface';
import { BaseStorage } from '../types/base-storage.interface';
import { v4 as uuid } from 'uuid';

export abstract class Storage<T extends BaseEntity, C, U, K extends keyof T>
  implements BaseStorage<T, C, U, K>
{
  protected entities: Array<T> = [];

  async findAll(): Promise<T[]> {
    return [...this.entities];
  }

  async findOne(id: string): Promise<T | undefined> {
    return this.entities.find((el) => el.id === id);
  }

  async create(data: C): Promise<Omit<T, K> | T | null> {
    const entity = {
      ...data,
      id: uuid(),
    } as unknown as T;

    this.entities.push(entity);
    return entity;
  }

  async update(id: string, data: U): Promise<Omit<T, K> | T | null> {
    const index = this.entities.findIndex((el) => el.id === id);
    if (index === -1) return undefined;

    this.entities[index] = { ...this.entities[index], ...data };
    return this.entities[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.entities.findIndex((el) => el.id === id);
    console.log('CALLED DELETE WITH INDEX', id);
    if (index === -1) return false;

    this.entities.splice(index, 1);
    return true;
  }
}
