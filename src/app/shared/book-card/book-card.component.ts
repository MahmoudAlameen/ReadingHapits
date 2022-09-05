import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/classes/Book';
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
  constructor(private router:Router)
   { 

   }

  ngOnInit(): void {
  }
  openBook()
  {
    this.router.navigate(["book",this.book.id])

  }
}
