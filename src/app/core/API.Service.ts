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
//  base:string="https://localhost:443/";

    AddUser:string=this.base+"users/addUser/";
    UserLogin=this.base+"users/login";
    UserLogout = this.base +"users/logout";
    AuthenticateUser=this.base+"users/isAuthenticated";
    ReadingRooms=this.base+"readingRooms/readingRoomsCards";
    GetReadingRoom=this.base+"readingRooms/getReadingRoom";
    GetBook=this.base+"books/getBook";
    GetArticle=this.base+"articles/getArticle";
    bookPagesNumber = this.base + "books/book/pagesNumber";

    /***reports */
    private report:string ="reports"
    visitReadingRoom = `${this.base}${this.report}/reading-rooms/visit`;
    addBookTimeRead = `${this.base}${this.report}/books/add-read-time`;
    addArticleTimeRead = `${this.base}${this.report}/articles/add-read-time`;
    constructor()
    {
        
    }

}