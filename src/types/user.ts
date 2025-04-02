export interface IPasskey {
    name: string;
    id: string;
    created_at: Date;
}

export interface User {
    id: string;
    name: string|null;
    image: string|null;
    email: string;
    created_at: Date;
    updated_at: Date;
}
