export class UserLoginResult
{
    token: string ='';
    expireDate?:Date ;
    mustChangePassword:boolean = false;
}