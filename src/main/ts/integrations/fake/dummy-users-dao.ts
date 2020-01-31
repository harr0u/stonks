import {makeDummyUser, makeDummyUsers} from '../../types/dummy/dummy-users'
import User from '../../types/user'
import {Maybe, eitherMap} from '../../lib/maybe'
import UsersDao from '../../interfaces/Dao/users-dao';


export default class DummyUsersDao implements UsersDao {
  constructor() {
    this.users = makeDummyUsers(20);
    this.nextUserId = this.users.reduce((nextId, user) => {user.id = nextId; return nextId + 1}, 1)
  }

  private readonly users: User[];
  private nextUserId: number;

  getUsers(): Promise<User[]> {
    return Promise.resolve(this.users)
  };

  getUserById(id: number): Promise<User> {
    return eitherMap(
      this.users.find((u) => u.id === id),
      (u) => Promise.resolve(u),
      () => Promise.reject(new Error('Couldn\'t find user with id ' + id.toString()))
    )
  };

  addUser(user: User): Promise<User> {
    return eitherMap(user.id, (id) => {
      if (!this.users.some((u) => u.id == id)) {
        this.users.push(user);
        this.nextUserId = Math.max(this.nextUserId, id + 1);

        return Promise.resolve(user);
      } else {
        return Promise.reject(new Error('Id is duplicated'))
      }
    },
    () => {
      const updatedUser: User = {...user, id: this.nextUserId++};
      this.users.push(updatedUser)
      return Promise.resolve(updatedUser);
    }
    );
  };

  deleteUserById(id: number): Promise<void> {
    const userArrayIndex = this.users.findIndex((u) => u.id == id);
    // ~x is true for every integer except -1  😎 😎 😎
    if (~userArrayIndex) {
      this.users.splice(userArrayIndex, 1);
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('integrations does not exist'))
    }
  };
}
