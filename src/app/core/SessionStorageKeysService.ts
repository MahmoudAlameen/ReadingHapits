import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SessionStorageKeysService
{
    public userId:string;
    userName:string;
    constructor()
    {
        this.userId="userId";
        this.userName="userName"
    }
}