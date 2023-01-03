import { Book } from "./Book"
import {Article} from "./Article"
import { BookCardDTO } from "../DTOs/BookCardDTO";
import { ArticleCardDTO } from "../DTOs/ArticleCardDTO";
export class ReadingRoomCard

{
    id:string;
    name:string;
    displayedBooks:BookCardDTO[];
    displayedArticles:ArticleCardDTO[];
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