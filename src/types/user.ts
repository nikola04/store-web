export interface User {
    id: string;
    name: string|null;
    image: string|null;
    email: string;
    created_at: Date;
    updated_at: Date;
}
