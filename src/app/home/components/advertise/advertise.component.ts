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
    setTimeout(()=>this.startMessagesTimer(msgs,circledImgs),0)
    
  }



  startMessagesTimer(msgs:HTMLCollection, circledImgs:HTMLCollection)
  {

    let msgsCounter=0;
    let circledImgsCounter=0;
    setInterval(()=>{
      msgs[msgsCounter].classList.add("hidden");
      circledImgs[circledImgsCounter].classList.add("hidden");
      msgsCounter=(msgsCounter+1)%msgs.length;
      msgs[msgsCounter].classList.remove("hidden");
      circledImgsCounter=(circledImgsCounter+1)%circledImgs.length;
      circledImgs[circledImgsCounter].classList.remove("hidden");

      // for(let i=0; i< msgs.length; i++)
      // {
        
      //   if(!msgs[i].classList.contains("hidden"))
      //   {
      //     msgs[i].classList.add("hidden");
      //     msgs[(i+1)%(msgs.length)].classList.remove("hidden");
      //     return;
      //   }
      // }

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
