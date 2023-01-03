import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {  SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { UserService } from 'src/app/core/User.Service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserName:string |null="";
  logoutButton:boolean=false;
  loginButton:boolean=false;

  constructor(private UserService: UserService ,private router:Router, private SessionStorage:SessionStorageService, private SessionKeys: SessionStorageKeysService) {

   }

  ngOnInit(): void {
    this.setUserValues();
 
     
    this.hidenavbar();
    this.startNavigation();
    document.addEventListener("click",()=>
    {


      this.hidenavbar();

    });
     //this.fireAnchor()
  }

  setUserValues()
  {
    console.log(sessionStorage);
    console.log(this.SessionStorage.isExist(this.SessionKeys.userId));

    if(this.SessionStorage.isExist(this.SessionKeys.userId))
    {
      console.log("ima there in ")

      this.loginButton=false;
      this.logoutButton=true;
      this.UserName= this.SessionStorage.getValue(this.SessionKeys.userName);
    }
    else
    {
      this.UserName="";
      this.loginButton= true;
      this.logoutButton=false;
    }

  }
  logout()
  {
    if(!this.SessionStorage.isExist(this.SessionKeys.userName))
      return;

    this.UserService.LogoutUser(this.SessionStorage.getValue(this.SessionKeys.userName) as string).subscribe(
     response=> 
     {
       if(response.isValid && response.model)
       {
         this.SessionStorage.removeKey(this.SessionKeys.userId);
         this.SessionStorage.removeKey(this.SessionKeys.userName);
         this.router.navigate(['login']);    
         this.UserName="";
         this.loginButton=false;
         this.logoutButton=false;

       }
       else
         alert(response.errorMessage);
     },
    err=> alert(err)
     )   


  }
  login()
  {
    this.loginButton=false;
    this.loginButton=false;
    this.router.navigate(['login']);
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
