/*import { Component, Input, OnInit } from '@angular/core';
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
  */

import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IArticleCard } from 'src/app/DTOs/ILearningSubjectDetails';
import { ResourceContentType } from 'src/app/enums/resource-content-type';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: IArticleCard;

  constructor(private router: Router) { }

  // Method to handle an article being clicked
  onArticleClick(): void {
    console.log(`Article "${this.article.title}" was clicked.`);
    if(this.article.resourceContentType == ResourceContentType.textPages)
        this.router.navigate(["/article",this.article.id]);
    else
        this.router.navigate(["/pdf-preview",this.article.id]);


    // Add logic to navigate to the full article page.
  }
}
