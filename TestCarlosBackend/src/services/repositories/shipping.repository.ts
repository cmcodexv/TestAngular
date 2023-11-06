import { Shipping } from './domain/shipping';

export interface ShippingRepository {
    find(id: number): Promise<Shipping | null>;
    get(): Promise<Shipping[]>;
    store(entry: Shipping): Promise<void>;
    remove(id: number, idUser: number): Promise<void>;
}