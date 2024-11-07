import { BaseEntity } from './base-entity.interface';

export interface BaseStorage<T extends BaseEntity, C, U, K extends keyof T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(data: C): Promise<Omit<T, K> | T>;
  update(id: string, data: U): Promise<Omit<T, K> | T | null>;
  delete(id: string): Promise<boolean>;
}
