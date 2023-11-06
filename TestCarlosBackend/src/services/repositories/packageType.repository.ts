import { PackageType } from './domain/packageType';

export interface PackageTypeRepository {
    get(): Promise<PackageType[]>;
}