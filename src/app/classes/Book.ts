import { ContentLanguage } from "../enums/contentLanguage.enum";
import { Level } from "../enums/level";
import { BookPage } from "./BookPage";

export class Book
{
    id:string='00000000-0000-0000-0000-000000000000';
    name:string='';
    level:Level=Level.one;
    roomId:string='';
    cover:string='';
    pages:BookPage[]=[];
    contentLanguage: ContentLanguage = ContentLanguage.Arabic;
}