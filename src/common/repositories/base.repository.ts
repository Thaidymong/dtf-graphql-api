export interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
}
