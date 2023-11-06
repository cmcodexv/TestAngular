import { PackageType } from "./repositories/domain/packageType";
import { PackageTypeRepository } from "./repositories/packageType.repository";

export class PackageTypeService {

    constructor(
        private readonly packageTypeRepository: PackageTypeRepository
    ) { }
    public async get(): Promise<PackageType[]> {
        return this.packageTypeRepository.get();
    }
    
}