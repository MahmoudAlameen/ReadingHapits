import { Article } from "./Article";
import { Book } from "./Book";

export class ReadingRoom
{
    id:string;
    name:string;
    discription:string;
    books:Book[];
    articles:Article[];
    constructor()
    {
        this.id='00000000-0000-0000-0000-000000000000';
        this.name="";
        this.books=[];
        this.articles=[];
        this.discription=''
    }
}