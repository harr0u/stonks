import User from '../../types/user';

export default interface UsersDao {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User>;
  addUser(user: User): Promise<User>;
  deleteUserById(id: number): Promise<void>;
}