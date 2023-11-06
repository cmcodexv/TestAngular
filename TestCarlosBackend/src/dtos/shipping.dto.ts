export interface ShippingCreateDto {
    address: string;
    zip_code: number;
    remitent: string;
    addressee: string;
    weight: number;
    created_by: number | null;
}

