class User {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;
  public age: number;

  constructor(name: string, email: string, password: string, age: number, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
  }
}

export default User;