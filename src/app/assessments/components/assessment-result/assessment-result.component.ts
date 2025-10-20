import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { IExamResult } from 'src/app/DTOs/assessments.interfaces';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.scss']
})
export class AssessmentResultComponent implements OnInit {
    @Input() result!: IExamResult | null;
    @Input() assessmentName!: string;
    @Input() timeRemainingSeconds: number = 0; // Time remaining when submitted
    alertMessage: AlertMessage = new AlertMessage();

    constructor(
      private route: ActivatedRoute,
      private assessmentService: AssessmentsService,
      private customAlert: CustomAlertService
    )
    {

    }

    // Calculate time taken from total duration and time remaining
    get timeTakenSeconds(): number {
        // Mock Assessment is 15 minutes (900 seconds). The App component sends the actual time left.
        const totalDuration = 15 * 60; 
        return totalDuration - this.timeRemainingSeconds;
    }

    /**
     * Converts total seconds into HH:MM:SS format.
     */
    formatTime(totalSeconds: number): string {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const pad = (n: number) => n < 10 ? '0' + n : n; 
        
        if (hours > 0) {
            return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
        }
        return `${pad(minutes)}m ${pad(seconds)}s`;
    }
  ngOnInit(): void {

    if(this.result == null)
    {
        this.route.paramMap.subscribe(
          param=>
            {
              let assessmentId =param.get("id");
              if(assessmentId)
              {
                this.assessmentService.getAssessmentResult(assessmentId)
                .subscribe(
                  res => 
                  {
                    if(res.isValid && res.model)
                    {
                      this.result = res.model

                    }
                    else
                    {
                      this.alertMessage.isDisplayed = true;
                      this.alertMessage.message = res.errorMessage;
                      this.customAlert.alert.next(this.alertMessage);
                    }
                  },
                  err =>
                  {
                    this.alertMessage.isDisplayed = true;
                    this.alertMessage.message = err;
                    this.customAlert.alert.next(this.alertMessage);

                  }
                );
              }
              

            })  
    }
  }

}
