import { IGrade } from "./grade.interfaces";

export interface IUserData
{
    name: string,
    email: string,
    avatarUrl?: string,
    grade?: IGrade
}