import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/classes/Book';
import { APIService } from 'src/app/core/API.Service';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';
import { BookCardDTO } from 'src/app/DTOs/BookCardDTO';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
 
})
export class BookCardComponent implements OnInit {
  @Input() book:BookCardDTO=new BookCardDTO();
  @Input() width:string="100px";
  @Input() height:string="100px";
  CoverUrl:string='';
  constructor(private router:Router, private API :APIService)
   { 
   }

  ngOnInit(): void {
    let imageDelemeters:string[] = this.book.cover.split(',');
    let filed= imageDelemeters[0].trim();
    let fileName = imageDelemeters[1].trim();
    this.CoverUrl= this.API.base + "Books/Covers/" + filed + '/'+ fileName; 
    console.log(this.CoverUrl);

  }
  openBook()
  {
    this.router.navigate(["/book",this.book.id])

  }
}
