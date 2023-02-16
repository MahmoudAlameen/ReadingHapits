import { Component, OnInit } from '@angular/core';
import { CustomAlertService } from 'src/app/core/custom-alert.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {
  isDisplayed:boolean=false;
  message:string ='';

  constructor(private customAlert:CustomAlertService) { }

  ngOnInit(): void {
    this.setup();
  }
  setup()
  {
    this.customAlert.alert.subscribe(
      alert =>
      {
        if(alert.isDisplayed)
        {
          this.isDisplayed= true;
          this.message = alert.message;
          setTimeout(() => {
            this.isDisplayed = false;
            this.message = '';
          }, 3000);
        }
      }
    )

  }

}
