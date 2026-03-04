import { Component, inject, OnDestroy, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, interval, Subscription, takeWhile } from 'rxjs';
import { AssessmentState, IAssessmentData, IExamResult, IQuestion, IUserAnswer } from 'src/app/DTOs/assessments.interfaces';
import { AssessmentOrchestratorService } from 'src/app/core/assessment-orchestrator.service';
// --- Placeholder for required Firebase imports (per instructions) ---

@Component({
  selector: 'app-run-assessment',
  templateUrl: './run-assessment.component.html',
  styleUrls: ['./run-assessment.component.scss']
})
export class RunAssessmentComponent implements OnInit, OnDestroy {
    
    // Using inject() for service dependency acquisition.
    public assessmentOrchestratorService = inject(AssessmentOrchestratorService); 

    public Object = Object; // To use Object.keys in template   

    // Properties initialized using the injected service
    public currentState: AssessmentState = this.assessmentOrchestratorService.assessmentState.getValue();
    
    // Other properties
    public assessment: IAssessmentData | null = null; 
    public answers: Record<string, IUserAnswer> = {};
    public examResult: IExamResult | null = null; // New result property
    public errorDetail$ = this.assessmentOrchestratorService.errorDetail$; // New: to display API error messages
    // Timer properties
    public timeLeft: number = 0;
    public timeLeft$ = new BehaviorSubject<number>(0);
    private timerSubscription!: Subscription;
    private stateSubscription!: Subscription;
    private answerSubscription!: Subscription;
    private resultSubscription!: Subscription; // New subscription for results

    constructor(
        private route: ActivatedRoute,
        private sanitizer : DomSanitizer
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
          param=>
            {
              let assessmentId =param.get("id");
              if(assessmentId)
              {
                this.assessmentOrchestratorService.assessmentId = assessmentId;
                this.assessmentOrchestratorService.fetchAssessmentMetaData();
              }
              

            })  
        

 this.stateSubscription = this.assessmentOrchestratorService.assessmentState
            .subscribe(state => {
                this.currentState = state;
                
                // When entering 'meta' or 'taking', update assessment data
                const assessmentData = this.assessmentOrchestratorService.assessmentData.getValue();
                this.assessment = assessmentData;
                
                if (assessmentData?.meta) {
                    // Check if 'taking' state is reached (either by meta auto-start or manual start)
                    if (state === 'taking') {
                        // Initialize timer from the remaining time provided by run-meta or start-api
                        const initialTimeInSeconds = assessmentData.meta.remainingTimeInMinutes * 60;
                        this.startTimer(initialTimeInSeconds);
                    } else if (state === 'meta') {
                        // For the meta state, show the full duration before starting
                        this.timeLeft = assessmentData.meta.durationInMinutes * 60;
                        this.timeLeft$.next(this.timeLeft);
                        
                        // Crucially, if meta.iStarted is true, the service already transitioned to 'taking'
                        // so this 'meta' block only runs for a *fresh* start.
                    }
                }
            });
        
        this.answerSubscription = this.assessmentOrchestratorService.userAnswers.subscribe(answers => {
            this.answers = answers;
        });

        this.resultSubscription = this.assessmentOrchestratorService.examResult$.subscribe(result => {
            this.examResult = result;
        });

        // The service now handles fetching meta data in its constructor.
        // If the service's constructor is called *after* ngOnInit runs (depending on how the component is loaded), 
        // a manual call to fetchAssessmentMetaData might be needed here, but relying on the service's constructor 
        // which uses the route snapshot is the idiomatic way when the assessmentId is available.
    }

    // Recommended performance enhancement for *ngFor
    trackById(index: number, question: IQuestion): string {
        return question.id;
    }

    startAssessment(): void {
        this.assessmentOrchestratorService.startAssessment();
    }

    startTimer(initialTimeInSeconds: number): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }

        this.timeLeft = initialTimeInSeconds;
        this.timeLeft$.next(this.timeLeft);

        // Timer starts only when currentState is 'taking'
        this.timerSubscription = interval(1000)
            .pipe(
                takeWhile(() => this.timeLeft > 0)
            )
            .subscribe({
                next: () => {
                    this.timeLeft--;
                    this.timeLeft$.next(this.timeLeft);
                },
                complete: () => {
                    // This block runs when takeWhile condition is false (timeLeft <= 0)
                    console.log("Time is up! Submitting assessment.");
                    this.assessmentOrchestratorService.finishAssessment(); 
                }
            });
    }

finishAssessment(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        // This triggers the service to submit answers and then fetch the results.
        this.assessmentOrchestratorService.finishAssessment();
    } 
    
    saveAnswer(answer: IUserAnswer): void {
        this.assessmentOrchestratorService.saveSingleAnswer(answer);
    }
/**
     * Converts total seconds into MM:SS format with zero-padding.
     */
    formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const pad = (n: number) => n < 10 ? '0' + n : n; 
        return `${pad(minutes)}:${pad(remainingSeconds)}`;
    }

ngOnDestroy(): void {
        this.timerSubscription?.unsubscribe();
        this.stateSubscription?.unsubscribe();
        this.answerSubscription?.unsubscribe();
        this.resultSubscription?.unsubscribe();
    }

        sanitizeHtml(html: string): SafeHtml {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }



        // guard student from opening new tab or navigating away
        // 1. Detects when the tab is switched or browser is minimized
  @HostListener('document:visibilitychange', [])
  onVisibilityChange() {
    if (document.hidden && this.currentState === 'taking') {
      this.blockExam('Tab switched or browser minimized');
    }
  }

  // 2. Detects when the user clicks outside the browser or opens a new window
  @HostListener('window:blur', [])
  onWindowBlur() {
    if(this.currentState === 'taking')
        this.blockExam('Window lost focus (potential new window opened)');
  }

  blockExam(reason: string) {
     this.assessmentOrchestratorService.blockStudentAssessment();
     alert(`You have been blocked from the assessment due to: ${reason}. Please contact support for assistance.`);
  }
    
}
