import User from '../types/user';
import { pick } from '../utils';


function makeDummyUsers(count: number = 1): User[] {
  const names = ["Mark", "Misha", "Masha", "Monya", "Mock"];
  const passwords = ["qwerty", "qwe123", "123qwe", "qweasd"];

  const users: User[] = []
  for (let i = 0; i < count; i++) {
    const name = pick(names);
    users.push({
      name: name,
      email: name + Math.ceil(Math.random() * 35).toString(),
      password: pick(passwords),
      age: Math.ceil(16 + Math.random() * 12)
    })
  }

  return users
}

function makeDummyUser(): User {
  return makeDummyUsers(1)[0]
}

export {makeDummyUsers, makeDummyUser}