import { BaseEntity } from './base-entity.interface';

export interface BaseStorage<T extends BaseEntity> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
