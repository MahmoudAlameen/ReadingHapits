import { Role } from "src/app/enums/Role";

export interface logedUser
{
    email:string,
    password:string,
    role:Role
}