/*
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
  constructor(private router:Router, private API :APIService, private readingRoomService:ReadingRoomsService)
   { 
   }

  ngOnInit(): void {
    console.log(this.book);
    this.getPagesNumber();
    if(this.book.cover)
    {
      let imageDelemeters:string[] = this.book.cover.split(',');
      let filed= imageDelemeters[0].trim();
      let fileName = imageDelemeters[1].trim();
      this.CoverUrl= this.API.base + "Books/Covers/" + filed + '/'+ fileName; 

    }
  
    console.log(this.CoverUrl);

  }
  openBook()
  {
    this.router.navigate(["/book",this.book.id])

  }

  getPagesNumber()
  {
    this.readingRoomService.getBookPagesNumber(this.book.id).subscribe(
      response=>
      {
        if(response.isValid)
        {
          this.book.pagesNumber = response.model as number;
        }
        else
         alert(response.errorMessage)
      }
      ,
      err=> alert(err)
    )
  }
}
  */
 import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book!: { imageUrl: string; title: string };

  constructor() { }

  // Method to handle a book being clicked, e.g., to navigate or open a detail view
  onBookClick(): void {
    console.log(`Book "${this.book.title}" was clicked.`);
    // Here you would add navigation or a modal for the book details.
  }
}
