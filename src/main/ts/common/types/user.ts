import {Option, optionApply} from '../lib/option';

class User {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;
  public age: number;

  constructor(id: Option<number>, name: string, email: string, password: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
  }
}

export default User;