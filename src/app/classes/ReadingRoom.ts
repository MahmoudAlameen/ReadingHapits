import { Article } from "./Article";
import { Book } from "./Book";

export class ReadingRoom
{
    id:number;
    name:string;
    books:Book[];
    articles:Article[];
    constructor()
    {
        this.id=0;
        this.name="";
        this.books=[];
        this.articles=[]
    }
}