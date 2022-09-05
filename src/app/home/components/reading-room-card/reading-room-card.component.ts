import { Component, Input, OnInit } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { ReadingRoom } from 'src/app/classes/ReadingRoom';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';
import { ReadingRoomComponent } from 'src/app/reading-room/reading-room.component';

@Component({
  selector: 'app-reading-room-card',
  templateUrl: './reading-room-card.component.html',
  styleUrls: ['./reading-room-card.component.scss']
})
export class ReadingRoomCardComponent implements OnInit {

 @Input() readingRoom!:ReadingRoom
  constructor(private router:Router)
  {
  }

  ngOnInit(): void {
  }
  overlayStyle(overlay:HTMLElement)
  {
    overlay.style.zIndex="2";

  }
  removeOverlay(overlay:HTMLElement)
  {
    overlay.style.zIndex="-1"
  }

  navigateTOReadingRoom(roomId:number)
  {
    this.router.navigate(["/ReadingRoom",roomId])
  }
}
