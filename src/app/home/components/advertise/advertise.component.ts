import { Component, OnInit } from '@angular/core';
import { AdvertiseMessagesService } from 'src/app/core/advertise-messages.service';
import { IAdvertiseMessages } from 'src/interfaces/advertiseMessages';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit {
  circledImg:string="./assets/images/boy.jpg";
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

    setTimeout(()=>this.startMessagesTimer(msgs),1)
    
  }

  startMessagesTimer(msgs:HTMLCollection)
  {

    let counter=0;
    setInterval(()=>{
      msgs[counter].classList.add("hidden");
      counter=(counter+1)%msgs.length
      msgs[counter].classList.remove("hidden");

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
