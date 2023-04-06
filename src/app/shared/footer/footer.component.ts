import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  phoneBox :boolean = false;
  mailBox:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  openClosePhoneBox()
  {
    if(this.phoneBox)
       this.phoneBox = false;
    else
       this.phoneBox = true;   

    console.log("hey iam in open")
  }
  openCloseMailBox()
  {
    if(this.mailBox)
    this.mailBox = false;
 else
    this.mailBox = true;  
    
  }

}
