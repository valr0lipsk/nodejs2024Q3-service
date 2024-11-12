import { BaseEntity } from 'src/lib/types/base-entity.interface';

export interface User extends BaseEntity {
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
