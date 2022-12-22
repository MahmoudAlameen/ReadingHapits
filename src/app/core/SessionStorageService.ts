import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class SessionStorageService
  {
    
    
    constructor()
    {

    }

    getValue(key : string)
    {
        return sessionStorage.getItem(key);
    }
    isExist(key:string)
    {
        console.log(sessionStorage.getItem("userId"));
        if(sessionStorage.getItem(key))
          return true;
        else 
           return false;  
    }
    removeKey(key: string)
    {
        sessionStorage.removeItem(key);
    }

    setItem(key:string, value : string)
    {
        sessionStorage.setItem(key, value);
    }
  } 