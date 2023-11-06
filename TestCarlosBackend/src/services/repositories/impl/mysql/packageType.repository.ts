import connection from '../../../../common/persistence/persistence.mysql';
import { PackageTypeRepository } from '../../packageType.repository';
import { PackageType } from "../../domain/packageType";

export class PackageTypeMysqlRepository implements PackageTypeRepository {
    async get(): Promise<PackageType[]> {
        const con = await connection;

        const [rows]: any = await con.query(
            'SELECT id, description, interval_kg, price_calculation FROM package_type WHERE active= true;'
        );
        return rows as PackageType[];
    }
}