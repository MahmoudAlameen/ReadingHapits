import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from 'src/app/classes/Article';
import { ArticlePage } from 'src/app/classes/ArticlePage';
import { ContentService } from 'src/app/core/content.service';
import { ReadingRoomRepositoryService } from 'src/app/core/reading-room-repository.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleId:number=0;
  article:Article=new Article();
  articlePages:ArticlePage[]=[];

  displayedPage:number=1;
  constructor(private readingRoomRepository:ReadingRoomRepositoryService,private contentService:ContentService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      let id=params.get('id');
      if(id==null)
        this.articleId=0;
      else
        this.articleId=parseInt(id);  
      console.log(this.articleId);  
      this.article=this.readingRoomRepository.getArticle(this.articleId);
      this.getArticleContent();
    })
  }

  getArticleContent()
  {
    this.contentService.getArticlePages(this.articleId).subscribe(
      pages=>
      {
        for(let page of pages)
        {
          this.contentService.getFile(page.content,page.type,"articlePage").subscribe(
            file=>
            {
              //this.contentService.readFile(page,file);
              page.content=file;

            }
          )
        }
        this.articlePages=pages;
        this.contentService.sortPages(this.articlePages);

      },
      err=> alert(err)
    )
  }
  flipPage()
  {
    this.displayedPage=(this.displayedPage+1)%this.articlePages.length;
    console.log(this.displayedPage);
  }

  settupforTest()
  {
    this.articlePages[0].content=" iam page number 1 ";
    this.articlePages[1].content=" iam page number 2 ";
    this.articlePages[2].content=" iam page number 3 ";
;
  }

}
