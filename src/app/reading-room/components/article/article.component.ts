import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { Article } from 'src/app/classes/Article';
import { ArticlePage } from 'src/app/classes/ArticlePage';
import { ContentService } from 'src/app/core/content.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { ReadingRoomRepositoryService } from 'src/app/core/reading-room-repository.service';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';
import { SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleId:string='';
  article:Article=new Article();
  articlePages:ArticlePage[]=[];
  readTimeStart:string|null=null;
  readTimeEnd:string|null=null;
  userId:string|null=null;
  displayedPage:number=0;
  articleOpened:boolean = false;
  readingInProgress:boolean = false;
  alertMessage:AlertMessage = new AlertMessage();

  constructor( private readingRoomService: ReadingRoomsService ,private readingRoomRepository:ReadingRoomRepositoryService
    ,private contentService:ContentService,private activatedRoute:ActivatedRoute, 
    private SessionStorage:SessionStorageService, private SessionKeys:SessionStorageKeysService, private customAlert:CustomAlertService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      let id=params.get('id');
      if(id==null)
        this.articleId='';
      else
        this.articleId=id;  
      console.log(this.articleId);  
     // this.article=this.readingRoomRepository.getArticle(this.articleId);
      this.getArticleContent();
    })

    this.userId = this.SessionStorage.getValue(this.SessionKeys.userId);
  }

  getArticleContent()
  {
    this.readingRoomService.getArticle(this.articleId).subscribe(
      response=> 
      {
        if(response.isValid)
        {
          this.article= response.model as Article;
          this.articlePages= this.article.pages;
          console.log(this.articlePages[this.displayedPage]);
          
        }
        else
        {
          this.alertMessage.message = `${response.errorMessage}`;
          this.customAlert.alert.next(this.alertMessage);
        }
      },
      err=> 
      {
        this.alertMessage.message = `${err}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    )

  }
  flipPage(direction:string)
  {
    switch(direction)
    {
      case 'front':
        this.displayedPage=(this.displayedPage+1)%this.articlePages.length;
        break;
      case 'back':
         this.displayedPage=this.displayedPage>0 ? this.displayedPage-1 : this.articlePages.length-1;
         break; 

    }
  }

  startRead()
  {
    let date = new Date();
    this.readTimeStart= `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  endRead()
  {
    let date= new Date();
    this.readTimeEnd = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(this.readTimeStart == null || this.readTimeEnd == null)
        return;
    this.readingRoomService.addArticleTimeRead(this.articleId, this.userId as string, this.readTimeStart as string, this.readTimeEnd as string).subscribe(
      response=>
      {
        if(response.isValid)
        {
          let alertMessage:AlertMessage= new AlertMessage();
          alertMessage.isDisplayed= true;
          alertMessage.message = ` وقت القراءة الكلى${response.model}`;
          this.customAlert.alert.next(alertMessage);
          this.readTimeStart=null;
          this.readTimeEnd= null;
        }
        else
        {
          this.alertMessage.message = `${response.errorMessage}`;
          this.customAlert.alert.next(this.alertMessage);
        }
      }
      ,err=>
      {
        this.alertMessage.message = `${err}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }
  openArticle(articleCover:HTMLElement)
  {
    articleCover.classList.remove("close");
    articleCover.classList.add("open");
    this.readingInProgress = true;
    this.startRead();
  }
  async closeArticle()
  {
    let articleCover = document.getElementById("articleCover");
            //this.articleOpened = false;
    articleCover?.classList.remove("open");
    articleCover?.classList.add("close");
    this.readingInProgress = false;
    this.endRead();
  }
}