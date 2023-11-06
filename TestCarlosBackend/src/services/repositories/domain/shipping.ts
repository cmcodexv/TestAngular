export interface Shipping {
    id?: number;
    address: string;
    zip_code: number;
    remitent: string;
    addressee: string;
    weight: number;
    price?: number;
    created_by?: Date | null;
}
