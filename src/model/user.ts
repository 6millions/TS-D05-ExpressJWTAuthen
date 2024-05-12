// models/user.ts
export class User {
    public id: string;
    public username: string;
    public password: string;
    private token: string;
  
    constructor(id: string, username: string, password: string) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.token = '';
    }
    // setter for token
    public setToken(token: string): void {
      this.token = token;
    }
    // getter for token
    public getToken(): string {
      return this.token;
    }
  }
  