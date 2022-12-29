import { Injectable } from '@angular/core';
@Injectable
(
    {
        providedIn:'root'
    }
)
export class APIService
{
    base:string="https://localhost:7024/";
    AddUser:string=this.base+"users/addUser/";
    UserLogin=this.base+"users/login";
    AuthenticateUser=this.base+"users/isAuthenticated";
    ReadingRooms=this.base+"readingRooms/readingRoomsCards";
    GetReadingRoom=this.base+"readingRooms/getReadingRoom";
    GetBook=this.base+"books/getBook";
    GetArticle=this.base+"articles/getArticle"
    constructor()
    {
        
    }

}