import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../classes/Article';
import { Book } from '../classes/Book';
import { ReadingRoom } from '../classes/ReadingRoom';
import { ReadingRoomFactoryService } from '../core/reading-room-factory.ts.service';
import { ReadingRoomRepositoryService } from '../core/reading-room-repository.service';
import { ReadingRoomsService } from '../core/reading-rooms.service';
import { SessionStorageKeysService } from '../core/SessionStorageKeysService';
import { SessionStorageService } from '../core/SessionStorageService';
import { ArticleCardDTO } from '../DTOs/ArticleCardDTO';
import { BookCardDTO } from '../DTOs/BookCardDTO';
import { Level } from '../enums/level';

@Component({
  selector: 'app-reading-room',
  templateUrl: './reading-room.component.html',
  styleUrls: ['./reading-room.component.scss'],

})
export class ReadingRoomComponent implements OnInit {
  @Input() roomId:string =""
  readingRoom:ReadingRoom =new ReadingRoom()
  bookCardWidth:string="150px";
  bookCardHeight:string="150px";
  contentView:string="books";
  contentHead:string="الكتب";
  userId:string="";
  booksCards : BookCardDTO[]=[];
  articlesCards : ArticleCardDTO[] = [];
  levelFilter:Level|null = null;

  constructor( private ReadingRoomFactory: ReadingRoomFactoryService  , private router:Router,private ReadingRoomRepository:ReadingRoomRepositoryService, 
    private activeRoute:ActivatedRoute , private SessionStorage: SessionStorageService, private SessionKeys: SessionStorageKeysService) {
     }

  ngOnInit(): void {
    this.userId=this.SessionStorage.getValue(this.SessionKeys.userId)?? "";

    this.activeRoute.paramMap.subscribe(
      param=>
      {
        let id=param.get("id");
        id!=null?this.roomId=id:this.roomId="";

      } 
    )

    this.ReadingRoomRepository.setActiveReadingRoom(this.roomId, this.userId);
    this.ReadingRoomRepository.ActiveReadingRoom.subscribe(
      room=>
      {
        this.readingRoom=room?? new ReadingRoom();
        this.articlesCards = this.ReadingRoomFactory.createArticlesDTOs(this.readingRoom.articles);
        this.booksCards = this.ReadingRoomFactory.createBooksCardsDTO(this.readingRoom.books); 
        console.log(this.readingRoom.books);
      }
    )
  }


  opencontentNavBar(event:Event, navbar:HTMLElement)
  {
    navbar.classList.toggle("open")
  }
  setLevel(level: HTMLSelectElement)
  {
    switch(level.value)
    {
      case '1':
        this.levelFilter=Level.one;
        break;
      case '2':
        this.levelFilter= Level.two;
        break;
      case '3': 
      this.levelFilter = Level.three;
      break;  
      default:
        this.levelFilter=null;
    }
    if(this.levelFilter)
      this.filterRoomItems(this.levelFilter);
    else
    {
      this.booksCards=this.ReadingRoomFactory.createBooksCardsDTO(this.readingRoom.books);
      this.articlesCards = this.ReadingRoomFactory.createArticlesDTOs(this.readingRoom.articles);
    }
       
  }

  filterRoomItems(level:Level)
  {
    let books : Book[] =[];
    let articles : Article[]=[];
    console.log(this.readingRoom.books);
    for(let book of this.readingRoom.books)
    {
      if(book.level==level)
        books.push(book);
    }
    this.booksCards = this.ReadingRoomFactory.createBooksCardsDTO(books);
    for(let article of this.readingRoom.articles)
    {
      if(article.level==level)
         articles.push(article);
    }
   this.articlesCards = this.ReadingRoomFactory.createArticlesDTOs(articles);
  }



}
