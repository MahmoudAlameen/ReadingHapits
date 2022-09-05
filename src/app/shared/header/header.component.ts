import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hidenavbar()
  {
    let nav=document.getElementById("myNavbar");
    if(nav!=null)
    {
      nav.classList.remove("in")

    }
      
    

  }

}
