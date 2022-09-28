import { Book } from "./Book"
import {Article} from "./Article"
export class ReadingRoomCard
{
    displayedBooks:Book[];
    id:number;
    displayedArticles:Article[];
    name:string;
    booksNumber:number;
    articlesNumber:number;

    constructor()
    {
        this.displayedBooks=[];
        this.displayedArticles=[];
        this.name="";
        this.articlesNumber=0;
        this.booksNumber=0;
        this.id=0;
    }
}