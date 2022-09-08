import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) {
    this.hidenavbar();
    this.startNavigation();
   }

  ngOnInit(): void {
    document.addEventListener("click",this.hidenavbar)
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
}
