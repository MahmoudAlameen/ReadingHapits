import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subscribable, Subscription } from 'rxjs';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { AssessmentState, IAssessmentData, IExamResult, IQuestion, IUserAnswer } from 'src/app/DTOs/assessments.interfaces';
import { AssessmentMetaComponent } from '../assessment-meta/assessment-meta.component';
// --- Placeholder for required Firebase imports (per instructions) ---

@Component({
  selector: 'app-run-assessment',
  templateUrl: './run-assessment.component.html',
  styleUrls: ['./run-assessment.component.scss']
})
export class RunAssessmentComponent implements OnInit, OnDestroy {
    
    // Using inject() for service dependency acquisition.
    public assessmentService = inject(AssessmentsService); 

    public Object = Object; // To use Object.keys in template   

    // Properties initialized using the injected service
    public currentState: AssessmentState = this.assessmentService.assessmentState.getValue();
    
    // Other properties
    public assessment: IAssessmentData | null = null; 
    public answers: Record<string, IUserAnswer> = {};
    public examResult: IExamResult | null = null; // New result property
    
    // Timer properties
    public timeLeft: number = 0;
    public timeLeft$ = new BehaviorSubject<number>(0);
    private timerSubscription!: Subscription;
    private stateSubscription!: Subscription;
    private answerSubscription!: Subscription;
    private resultSubscription!: Subscription; // New subscription for results

    constructor() { }

    ngOnInit(): void {
        this.stateSubscription = this.assessmentService.assessmentState.subscribe(state => {
            this.currentState = state;
            if (state === 'meta') {
                this.assessment = this.assessmentService.assessmentData.getValue()!;
                if (this.assessment) {
                    this.timeLeft = this.assessment.meta.durationInMinutes * 60;
                    this.timeLeft$.next(this.timeLeft);
                }
            }
        });
        
        this.answerSubscription = this.assessmentService.userAnswers.subscribe(answers => {
            this.answers = answers;
        });

        this.resultSubscription = this.assessmentService.examResult$.subscribe(result => {
            this.examResult = result;
        });
        
        // =========================================================================
        // !!! MANDATORY: FIREBASE AUTHENTICATION BOILERPLATE !!!
        // =========================================================================
        /*
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        
        if (typeof __initial_auth_token !== 'undefined') {
            signInWithCustomToken(auth, __initial_auth_token).catch(e => console.error("Firebase Auth Error:", e));
        } else {
            signInAnonymously(auth).catch(e => console.error("Firebase Anon Auth Error:", e));
        }
        console.log("Firebase Auth established for environment access.");
        // =========================================================================
        */
    }

    // Recommended performance enhancement for *ngFor
    trackById(index: number, question: IQuestion): string {
        return question.id;
    }

    startAssessment(): void {
        this.assessmentService.startAssessment();
        this.startTimer();
    }

    startTimer(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }

        this.timerSubscription = interval(1000)
            .subscribe(() => {
                this.timeLeft--;
                this.timeLeft$.next(this.timeLeft);
                
                if (this.timeLeft <= 0) {
                    this.timerSubscription.unsubscribe();
                    console.log("Time is up! Submitting assessment.");
                    this.assessmentService.finishAssessment(); 
                }
            });
    }

    finishAssessment(): void {
        // Stop the timer immediately upon finishing the exam
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        // This triggers the service to submit answers and then fetch the results.
        this.assessmentService.finishAssessment();
    }

    saveAnswer(answer: IUserAnswer): void {
        this.assessmentService.saveSingleAnswer(answer);
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
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
        if (this.answerSubscription) {
            this.answerSubscription.unsubscribe();
        }
        if (this.resultSubscription) {
            this.resultSubscription.unsubscribe();
        }
    }
}
