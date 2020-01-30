import {makeDummyUser, makeDummyUsers} from '../common/dummy/dummyUsers'
import User from '../common/types/user'
import {Option, eitherMap} from '../common/lib/option'
import Repository from '../interfaces/repository';


class DummyUsersRepository implements Repository<User> {
  constructor() {
    this.users = makeDummyUsers(20);
    this.nextUserId = this.users.reduce((nextId, user) => {user.id = nextId; return nextId + 1}, 1)
  }

  private users: User[];
  private nextUserId: number;

  get(): Promise<User[]> {
    return Promise.resolve(this.users)
  };

  getById(id: number): Promise<User> {
    return eitherMap(
      this.users.find((u) => u.id === id),
      (u) => Promise.resolve(u),
      () => Promise.reject(new Error('Couldn\'t find repos with id ' + id.toString()))
    )
  };

  add(user: User): Promise<User> {
    return eitherMap(user.id, (id) => {
      if (this.users.some((u) => u.id == id)) {
        return Promise.reject(new Error('Id is duplicated'))
      } else {
        return Promise.resolve(user)
      }
    },
    () => {
      return Promise.resolve({...user, id: this.nextUserId++});
    }
    );
  };

  deleteById(id: number): Promise<void> {
    const userArrayIndex = this.users.findIndex((u) => u.id == id);
    if (~userArrayIndex) {
      this.users.splice(userArrayIndex, 1);
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('repos does not exist'))
    }
  };
}

export default DummyUsersRepository;