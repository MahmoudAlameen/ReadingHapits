import { Gender } from "../enums/gender";
import { Role } from "../enums/Role";

export class Student
{
    name: string="";
    email: string="";
    gender:Gender= Gender.male;
    age:number| null = null;
    country: string="";
    governate: string="";
    school: string="";
    password: string="";
    role:Role=Role.Student;
    phoneNumber: string = '';
    gradeId: string = '';
    avatarUrl? : string = '';
}