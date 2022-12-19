import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserName:string="dfdfdf";
  islogned:boolean=false;

  constructor(private router:Router) {

   }

  ngOnInit(): void {
    let userName= sessionStorage.getItem("userId");
    console.log(userName);
    if(userName!=null)
    {
      this.islogned=true;
      this.UserName=userName;
    }
     
    this.hidenavbar();
    this.startNavigation();
    document.addEventListener("click",()=>
    {


      this.hidenavbar();

    });
     //this.fireAnchor()
  }



  hidenavbar()
  {
    let nav=document.getElementById("myNavbar");
    if(nav!=null)
    {
      nav.classList.remove("in")
    }
  }
  startNavigation()
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          
        this.hidenavbar();
        // Show progress spinner or progress bar
          //console.log('Route change detected');
      }
      
  })

}


fireAnchor()
{
  let anchors=document.getElementsByTagName("a");
  for(let i=0; i<anchors.length; i++)
  {
    anchors[i].addEventListener("click",function(){
      this.classList.remove("whiteText");
      this.classList.add("blackText")
      console.log("anchor clicked...")
      
    })

  }

}




}
