import connection from '../../../../common/persistence/persistence.mysql';
import { ShippingRepository } from '../../shipping.repository';
import { Shipping } from "../../domain/shipping";

export class ShippingMysqlRepository implements ShippingRepository {

    public async find(id: number): Promise<Shipping | null> {

        const con = await connection;

        const [rows]: any[] = await con.execute(
            'SELECT id FROM shipping WHERE id = ? AND active = true;',
            [id]
        );
        if (rows.length) {
            return rows[0] as Shipping;
        }
        
        return null;
    }
    async get(): Promise<Shipping[]> {
        const con = await connection;

        const [rows]: any = await con.query(
            'SELECT  s.id, s.address, s.zip_code, s.remitent, s.addressee, s.weight, s.price, c.name as transport_company FROM shipping s INNER JOIN company c ON s.company_id = c.id WHERE c.active = true AND s.active = true ORDER BY s.id;'
        );
        return rows as Shipping[];
    }

    public async store(entry: Shipping): Promise<void> {
        const con = await connection;
        const now = new Date();

        await con.execute(
            'INSERT INTO shipping (address, zip_code, remitent, addressee, weight, active, created_at, created_by) VALUES (?,?,?,?,?,?,?,?)',
            [entry.address, entry.zip_code, entry.remitent, entry.addressee, entry.weight, true, now, entry.created_by]
        );
    }

    public async remove(id: number, idUser: number): Promise<void> {
        const con = await connection;
        const now = new Date();
        await con.execute(
            'UPDATE shipping SET Active = false, updated_at = ?, updated_by = ? WHERE id = ?;',
            [now, idUser, id]
        );
    }

}