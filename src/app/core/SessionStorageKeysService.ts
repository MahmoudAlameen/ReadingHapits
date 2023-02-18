import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SessionStorageKeysService
{
    public userId:string;
    userName:string;
    name:string;
    constructor()
    {
        this.userId="userId";
        this.userName="userName";
        this.name = "name"
    }
}