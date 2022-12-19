import { Gender } from "../enums/gender";

export class Student
{
    name: string="";
    email: string="";
    gender:Gender= Gender.male;
    age:number= 0;
    country: string="";
    governate: string="";
    school: string="";
    password: string="";
}