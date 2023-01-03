import { pageType } from "../enums/PagType";

export class Page
{
    id:string='00000000-0000-0000-0000-000000000000';
    number:number=0;
    content:string="";
    pageType:pageType=pageType.text
}