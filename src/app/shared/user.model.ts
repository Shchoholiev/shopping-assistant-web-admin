import { Role } from "./role.model";

export class User {
    id: string = '';
    webId: string = '';
    appleDeviceId: string = '';
    phone: string = '';
    name: string = '';
    email: string = '';
    roles: Role[] = [];
}
