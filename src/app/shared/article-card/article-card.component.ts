import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/classes/Article';
import { ArticleCardDTO } from 'src/app/DTOs/ArticleCardDTO';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  constructor(private router:Router) { }
  @Input() article!:ArticleCardDTO;
  @Input() width:string="120px";
  @Input() height:string="120px";
  ngOnInit(): void {
  }


  openArticle()
  {
    this.router.navigate(["/article",this.article.id]);

  }

}
