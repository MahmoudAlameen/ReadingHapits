import { Level } from "../enums/level";
import { ArticlePage } from "./ArticlePage";

export class Article
{
    id:string;
    roomId:string;
    name:string;
    level:Level;
    pages: ArticlePage[];
    constructor()
    {
        this.id='00000000-0000-0000-0000-000000000000';
        this.roomId='00000000-0000-0000-0000-000000000000';
        this.name="";
        this.level= Level.one;
        this.pages=[];
    }
}