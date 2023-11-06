import { Shipping } from "./repositories/domain/shipping";
import { ShippingCreateDto } from "../dtos/shipping.dto";
import { ShippingRepository } from "./repositories/shipping.repository";
import { ApplicationException } from "../common/exceptions/application.exception";

export class ShippingService {

    constructor(
        private readonly shippingRepository: ShippingRepository
    ) { }
    public async get(): Promise<Shipping[]> {
        return this.shippingRepository.get();
    }

    public async store(entry: ShippingCreateDto): Promise<void> {

        await this.shippingRepository.store(entry as Shipping);

    }


    public async remove(id: number, idUser: number): Promise<void> {
        const verify = await this.shippingRepository.find(id);
        if (verify) {
            await this.shippingRepository.remove(id, idUser);
        } else {
            throw new ApplicationException('Shipping does not exists!');
        }
    }
}