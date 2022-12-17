import { Injectable } from '@angular/core';
@Injectable
(
    {
        providedIn:'root'
    }
)
export class APIService
{
    base:string="http://localhost:7024/";
    AddUser:string=this.base+"User/AddUser/";
    UserLogin=this.base+"User/Login";
    AuthenticateUser=this.base+"User/AuthenticateUser";
    ReadingRooms=this.base+"ReadingRooms/ReadingRoomsCards";
    GetReadingRoom=this.base+"ReadingRooms/GetReadingRoom";
    GetBook=this.base+"Books/Book";
    GetArticle=this.base+"Article/GetArticle"
    constructor()
    {
        
    }

}