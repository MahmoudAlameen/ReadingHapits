import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomAlertService } from 'src/app/core/custom-alert.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {
  isDisplayed:boolean=false;
  message:string ='';
  private timer: any;

  constructor(
    private customAlert:CustomAlertService,
  private cdr: ChangeDetectorRef) { }

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

    showAlert(msg: string) {
    // 1. Clear any existing timer
    if (this.timer) clearTimeout(this.timer);

    // 2. Update data
    this.message = msg;
    this.isDisplayed = true;

    // 3. Manually tell Angular to check (Safety net for Interceptors)
    this.cdr.detectChanges(); 

    // 4. Set new timer
    this.timer = setTimeout(() => {
      this.isDisplayed = false;
      this.message = '';
      this.cdr.detectChanges();
    }, 3000);
  }

}
