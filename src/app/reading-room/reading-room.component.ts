import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingRoom } from '../classes/ReadingRoom';
import { ReadingRoomsService } from '../core/reading-rooms.service';

@Component({
  selector: 'app-reading-room',
  templateUrl: './reading-room.component.html',
  styleUrls: ['./reading-room.component.scss'],

})
export class ReadingRoomComponent implements OnInit {
  @Input() roomId:number =0
  readingRoom:ReadingRoom=new ReadingRoom()
  bookCardWidth:string="150px";
  bookCardHeight:string="150px";

  constructor(private router:Router,private readingRoomService:ReadingRoomsService) {
   
    this.getReadingRoom();
    //console.log(this.router?.getCurrentNavigation()?.extras.state)
   // this.readingRoom=this.router?.getCurrentNavigation()?.extras.state as ReadingRoom;
  }

  ngOnInit(): void {

  }
  getReadingRoom()
  {
    this.readingRoomService.getReadingRoom(this.roomId).subscribe(
      room=>this.readingRoom=room,
      err=>alert(err)
    )
  }

  openArticle(id:number)
  {

    this.router.navigate(["ReadingRoom/article",4])

  }



}
