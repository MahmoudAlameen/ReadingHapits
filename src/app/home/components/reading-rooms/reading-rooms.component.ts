import { Component, OnInit } from '@angular/core';
import { ReadingRoom } from 'src/app/classes/ReadingRoom';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';

@Component({
  selector: 'app-reading-rooms',
  templateUrl: './reading-rooms.component.html',
  styleUrls: ['./reading-rooms.component.scss']
})
export class ReadingRoomsComponent implements OnInit {
  ReadingRooms:ReadingRoom[]=[];
  constructor(private readingRoomService:ReadingRoomsService)
  {
    this.getReadingRooms();
  }

  ngOnInit(): void {
  }

  getReadingRooms()
  {
    this.readingRoomService.getReadingRooms(12).subscribe(
      rooms=>this.ReadingRooms=rooms,
      error=>alert(`error during fetching reading rooms fromm API ${error}`)
    )
  }
  

}
