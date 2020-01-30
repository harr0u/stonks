import { Option } from '../common/lib/option';

interface Repository<T> {
  get(): Promise<T[]>;
  getById(id: number): Promise<Option<T>>;
  add(item: T): Promise<T>;
  deleteById(id: number): Promise<void>;
}

export default Repository;