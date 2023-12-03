import { Role } from "./role.model";

export class User {
    id: string = '';
    phone: string = '';
    email: string = '';
    roles: Role[] = [];
}
