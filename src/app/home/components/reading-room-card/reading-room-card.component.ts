import { Component, Input, OnInit } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { ReadingRoom } from 'src/app/classes/ReadingRoom';
import { ReadingRoomCard } from 'src/app/classes/ReadingRoomCard';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';
import { SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { UserService } from 'src/app/core/User.Service';
import { ReadingRoomComponent } from 'src/app/reading-room/reading-room.component';

@Component({
  selector: 'app-reading-room-card',
  templateUrl: './reading-room-card.component.html',
  styleUrls: ['./reading-room-card.component.scss']
})
export class ReadingRoomCardComponent implements OnInit {

 @Input() readingRoomCard!:ReadingRoomCard
  constructor(private router:Router , private userService:UserService, private SessionStorage:SessionStorageService, private SessionKeys: SessionStorageKeysService)
  {
  }

  ngOnInit(): void {
    console.log(this.readingRoomCard)
  }
  overlayStyle(overlay:HTMLElement)
  {
    overlay.style.zIndex="2";

  }
  removeOverlay(overlay:HTMLElement)
  {
    overlay.style.zIndex="-1"
  }

  navigateTOReadingRoom(roomId:string)
  {
    console.log(roomId);
    let userId: string | null = this.SessionStorage.getValue(this.SessionKeys.userId);
    if(userId == null)
    {
      this.router.navigate(['/login']);
      return;
    }
      
    this.userService.IsAuthenticated(userId).subscribe(
      response=>
      {
        if(response)
           this.router.navigate(["/ReadingRoom",roomId]);
        else
           this.router.navigate(["/login"]);

      },
      err=> alert(err)
    )
  }
  
}
