import { Book } from "./Book"
import {Article} from "./Article"
export class ReadingRoomCard

{
    id:string;
    name:string;
    displayedBooks:Book[];
    displayedArticles:Article[];
    booksNumber:number;
    articlesNumber:number;

    constructor()
    {
        this.displayedBooks=[];
        this.displayedArticles=[];
        this.name="";
        this.articlesNumber=0;
        this.booksNumber=0;
        this.id="";
    }
}