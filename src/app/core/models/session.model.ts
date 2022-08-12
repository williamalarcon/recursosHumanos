import { User } from './user.model';

export class Session {
    public token: string;
    public cargo: string;
    public nombre: string;
    public usuario: string;
    public user: User;
  }