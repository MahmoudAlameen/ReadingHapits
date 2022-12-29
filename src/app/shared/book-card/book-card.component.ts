import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/classes/Book';
import { APIService } from 'src/app/core/API.Service';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
 
})
export class BookCardComponent implements OnInit {
  @Input() book:Book=new Book();
  @Input() width:string="100px";
  @Input() height:string="100px";
  CoverUrl:string;
  constructor(private router:Router, private API :APIService)
   { 
     this.CoverUrl= API.base + "Books/Covers/" + this.book.id +this.book.cover+ "jpg"; 
   }

  ngOnInit(): void {
  }
  openBook()
  {
    this.router.navigate(["/book",this.book.id])

  }
}
