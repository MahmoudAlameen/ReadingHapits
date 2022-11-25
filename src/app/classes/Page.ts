import { pageType } from "../enums/PagType";

export class Page
{
    Id:number=0;
    number:number=0;
    content:string="";
    type:pageType=pageType.text
}