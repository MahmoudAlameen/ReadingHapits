import { Component, OnInit } from '@angular/core';
import { AdvertiseMessagesService } from 'src/app/core/advertise-messages.service';
import { IAdvertiseMessages } from 'src/interfaces/advertiseMessages';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit {
  circledImgs:string[]=["./assets/images/advertise/boy.jpg","./assets/images/advertise/boy2.jpg"];
  Messages:IAdvertiseMessages[]=[];
  MessagesInterval:any=1
  constructor(private advertiseMessages:AdvertiseMessagesService) { 


  }

  ngOnInit(): void {
    this.getMessages();
    //this.startMessagesTimer()

   // setTimeout(()=>this.startMessagesTimer(),1)

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var msgs:HTMLCollection= document.getElementsByClassName("message");
    var circledImgs:HTMLCollection=document.getElementsByClassName("circledImg");
    setTimeout(()=>this.MessagesInterval=this.startMessagesTimer(msgs,circledImgs),0)
    
  }
 
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.MessagesInterval);

  }



  startMessagesTimer(msgs:HTMLCollection, circledImgs:HTMLCollection)
  {

    let msgsCounter=0;
    let circledImgsCounter=0;
 return   setInterval(()=>{
      msgs[msgsCounter].classList.add("hidden");
      circledImgs[circledImgsCounter].classList.add("hidden");
      msgsCounter=(msgsCounter+1)%msgs.length;
      msgs[msgsCounter].classList.remove("hidden");
      circledImgsCounter=(circledImgsCounter+1)%circledImgs.length;
      circledImgs[circledImgsCounter].classList.remove("hidden");

    },10000)
  }

  getMessages()
  {
    this.advertiseMessages.getAdvertisMessages().subscribe(
      messages=>
      {
        this.Messages=messages;

      },
      err=>alert(err)
    )

  }

}
