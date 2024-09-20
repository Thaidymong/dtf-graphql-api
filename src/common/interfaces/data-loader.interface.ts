import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

export interface INestDataLoader<TEntity> {
  generateDataLoader(): DataLoader<number, TEntity>;
}

@Injectable({
  scope: Scope.REQUEST,
})
export abstract class NestDataLoader<TEntity> {
  protected dataloader: DataLoader<number, TEntity>;

  load(id: number): Promise<TEntity> {
    return this.dataloader.load(id);
  }

  loadMany(ids: number[]): Promise<TEntity[]> {
    return this.dataloader.loadMany(ids) as Promise<TEntity[]>;
  }
}
