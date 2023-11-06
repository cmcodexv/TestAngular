import { User } from './domain/user';

export interface UserRepository {
    login(email:string, password: string): Promise<User[]>;
    get(): Promise<User[]>;
}