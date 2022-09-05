export class Book
{
    id:number;
    name:string;
    pagesNumber:number;
    exams:number[];
    readingRoom:number;
    cover:string
    constructor()
    {
        this.id=0;
        this.name="",
        this.exams=[],
        this.readingRoom=0,
        this.cover="",
        this.pagesNumber=0
    }
}