import { Component, OnInit } from '@angular/core';
import { ReadingRoom } from 'src/app/classes/ReadingRoom';
import { ReadingRoomCard } from 'src/app/classes/ReadingRoomCard';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';

@Component({
  selector: 'app-reading-rooms',
  templateUrl: './reading-rooms.component.html',
  styleUrls: ['./reading-rooms.component.scss']
})
export class ReadingRoomsComponent implements OnInit {
  readingRoomsCards:ReadingRoomCard[] | null=[];
  constructor(private readingRoomService:ReadingRoomsService)
  {
    this.getReadingRooms();
  }

  ngOnInit(): void {
  }

  getReadingRooms()
  {
    this.readingRoomService.getReadingRooms(4,0).subscribe(
      response=>
      {
        this.readingRoomsCards=response.modelList;
      },
      error=>alert(`error during fetching reading rooms fromm API ${error}`)
    )
  }
  

}
