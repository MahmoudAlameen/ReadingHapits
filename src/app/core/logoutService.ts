import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { SessionStorageKeysService } from "./SessionStorageKeysService";
import { SessionStorageService } from "./SessionStorageService";

@Injectable({
    providedIn: 'root'
  })
  export class LogoutService
  {
    constructor(private SessionStorage:SessionStorageService, private SessionKeys: SessionStorageKeysService, private router : Router)
    {

    }
    logout()
    {
        this.SessionStorage.removeKey(this.SessionKeys.userId);
        this.SessionStorage.removeKey(this.SessionKeys.userName);
        this.router.navigate(['login']);


    }
  }