import {makeDummyUser, makeDummyUsers} from '../mock/dummy-users'
import User from '../types/user'
import {Option, eitherMap} from '../lib/option'
import Repository from '../interfaces/repository';


class DummyUsersRepository implements Repository<User> {
  constructor() {
    this.users = makeDummyUsers(20);
    this.nextUserId = this.users.reduce((nextId, user) => {user.id = nextId; return nextId + 1}, 1)
  }

  private readonly users: User[];
  private nextUserId: number;

  get(): Promise<User[]> {
    return Promise.resolve(this.users)
  };

  getById(id: number): Promise<User> {
    return eitherMap(
      this.users.find((u) => u.id === id),
      (u) => Promise.resolve(u),
      () => Promise.reject(new Error('Couldn\'t find user with id ' + id.toString()))
    )
  };

  add(user: User): Promise<User> {
    return eitherMap(user.id, (id) => {
      if (this.users.some((u) => u.id == id)) {
        return Promise.reject(new Error('Id is duplicated'))
      } else {
        this.users.push(user);
        return Promise.resolve(user);
      }
    },
    () => {
      const updatedUser: User = {...user, id: this.nextUserId++};
      this.users.push(updatedUser)
      return Promise.resolve(updatedUser);
    }
    );
  };

  deleteById(id: number): Promise<void> {
    const userArrayIndex = this.users.findIndex((u) => u.id == id);
    // ~x is true for every integer except -1  😎 😎 😎
    if (~userArrayIndex) {
      this.users.splice(userArrayIndex, 1);
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('repos does not exist'))
    }
  };
}

export default DummyUsersRepository;