import connection from '../../../../common/persistence/persistence.mysql';
import { UserRepository } from '../../user.repository';
import { User } from "../../domain/user";
import SHA from 'sha.js';


export class UserMysqlRepository implements UserRepository {

    public async login(email: string, password: string): Promise<any> {

        const con = await connection;
        // Hash password
        password = SHA('sha256').update(password).digest('base64');

        const [rows]: any[] = await con.execute(
            'SELECT * FROM user WHERE email = ? AND password = ?',
            [email, password]
        );
        return rows;
    }
    async get(): Promise<User[]> {
        const con = await connection;

        const [rows]: any = await con.query(
            'SELECT id, name, surname, email, role FROM user WHERE active= true;'
        );
        return rows as User[];
    }
}