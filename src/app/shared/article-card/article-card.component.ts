import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/Article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  constructor() { }
  @Input() article!:Article;
  @Input() width:string="120px";
  @Input() height:string="120px";
  ngOnInit(): void {
  }

}
