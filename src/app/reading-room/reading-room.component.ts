import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadingRoom } from '../classes/ReadingRoom';
import { ReadingRoomRepositoryService } from '../core/reading-room-repository.service';
import { ReadingRoomsService } from '../core/reading-rooms.service';
import { SessionStorageKeysService } from '../core/SessionStorageKeysService';
import { SessionStorageService } from '../core/SessionStorageService';

@Component({
  selector: 'app-reading-room',
  templateUrl: './reading-room.component.html',
  styleUrls: ['./reading-room.component.scss'],

})
export class ReadingRoomComponent implements OnInit {
  @Input() roomId:number =0
  readingRoom:ReadingRoom =new ReadingRoom()
  bookCardWidth:string="150px";
  bookCardHeight:string="150px";
  contentView:string="books";
  contentHead:string="الكتب";
  userId:string="";

  constructor(private router:Router,private ReadingRoomRepository:ReadingRoomRepositoryService, 
    private activeRoute:ActivatedRoute , private SessionStorage: SessionStorageService, private SessionKeys: SessionStorageKeysService) {
     }

  ngOnInit(): void {
    this.userId=this.SessionStorage.getValue(this.SessionKeys.userId)?? "";

    this.activeRoute.paramMap.subscribe(
      param=>
      {
        let id=param.get("id");
        id!=null?this.roomId=parseInt(id):this.roomId=0;

      } 
    )

    this.ReadingRoomRepository.setActiveReadingRoom(this.roomId, this.userId);
    this.ReadingRoomRepository.ActiveReadingRoom.subscribe(
      room=>this.readingRoom=room?? new ReadingRoom()
    )
  }


  opencontentNavBar(event:Event, navbar:HTMLElement)
  {
    navbar.classList.toggle("open")
  }



}
