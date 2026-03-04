import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { AssessmentState, IAssessmentData, IAssessmentMeta, IExamResult, IQuestion, IUserAnswer } from '../DTOs/assessments.interfaces';
import { ActivatedRoute } from '@angular/router'; // To get the assessment ID from the URL
import { AssessmentsService } from './assessments.service';
import { debug } from 'console';
import { APIResponseModel } from '../classes/APIResponse';
import { CustomAlertService } from './custom-alert.service';

@Injectable({
    providedIn: 'root'
})
export class AssessmentOrchestratorService {
    private apiService = inject(AssessmentsService);
    private route = inject(ActivatedRoute); // Used to get assessmentId from URL
    private customAlert = inject(CustomAlertService); // For showing error messages to the user 

    public assessmentState = new BehaviorSubject<AssessmentState>('loading');
    public assessmentData = new BehaviorSubject<IAssessmentData | null>(null);
    public userAnswers = new BehaviorSubject<Record<string, IUserAnswer>>({});
    public examResult$ = new BehaviorSubject<IExamResult | null>(null);
    public errorDetail$ = new BehaviorSubject<string | null>(null);

    // Placeholder for the ID obtained via route
  public assessmentId: string = this.route.snapshot.paramMap.get('id')!;

    // Constructor initiates the main flow
    constructor() {


    }

    private setState(state: AssessmentState, errorMessage: string | null = null): void {
        this.assessmentState.next(state);
        this.errorDetail$.next(errorMessage);
    }


    /**
     * Step 1: Get Assessment Metadata and check access/status.
     * Orchestrates the shift to 'meta' or 'error' state.
     */
    public async fetchAssessmentMetaData(): Promise<void> {
        this.setState('loading');
        try {
            const result = await lastValueFrom(this.apiService.runAssessmentMetaData(this.assessmentId));

            if (!result.isValid) {
                this.setState('error', result.errorMessage);
                return;
            }

            const meta = result.model!;
            
            // Initial data structure: meta, questions (questions will be fetched on 'start')
            const currentData = this.assessmentData.getValue();
            this.assessmentData.next({
                meta: meta,
                questions: currentData?.questions || [] // Keep questions if already loaded, though usually null here
            });

            // check if student is blocked 
            if(meta.isBlocked)
            {
                this.setState('Blocked');
                return;
            }
            
            // Check if user has already started: if so, auto-start the timer and fetch questions
            if (meta.isStarted) {
                await this.fetchQuestionsAndStartTimer(meta.remainingTimeInMinutes);
            } else {
                this.setState('meta');
            }

        } catch (error) {
            console.error('API Error in fetchAssessmentMetaData:', error);
            this.setState('error', 'Could not load assessment metadata due to a network or server issue.');
        }
    }

    /**
     * Step 2: Start Assessment and fetch questions.
     * This is called when the user clicks 'Start' on the metadata screen.
     */
    public async startAssessment(): Promise<void> {
        this.setState('loading');
        try {
            const startResult = await lastValueFrom(this.apiService.startAssessment(this.assessmentId));

            if (!startResult.isValid) {
                this.setState('error', startResult.errorMessage);
                return;
            }

            const remainingTimeInMinutes = startResult.model?.remainingTimeInMinutes || 0;
            
            await this.fetchQuestionsAndStartTimer(remainingTimeInMinutes);

        } catch (error) {
            console.error('API Error in startAssessment:', error);
            this.setState('error', 'Failed to start the assessment due to a network or server issue.');
        }
    }

    private async fetchQuestionsAndStartTimer(remainingTimeInMinutes: number): Promise<void> {
        // Fetch Questions
        const questionsResult = await lastValueFrom(this.apiService.getQuestionsByAssessmentId(this.assessmentId));

        if (!questionsResult.isValid) {
            this.setState('error', questionsResult.errorMessage);
            return;
        }

        const questions: IQuestion[] = questionsResult.modelList || []
        
        // Update assessmentData with questions
        const currentMeta = this.assessmentData.getValue()?.meta;
        if (currentMeta) {
            this.assessmentData.next({
                meta: currentMeta,
                questions: questions
            });
        }
        
        // Notify component of time and transition to 'taking'
        this.setState('taking');
        this.startTimer(remainingTimeInMinutes * 60); // Convert minutes to seconds
    }
    
    // Placeholder for timer logic to be handled in the component
    private startTimer(initialTimeInSeconds: number): void {
        // The component (RunAssessmentComponent) will now handle the timer based on the time it receives.
        // We will pass the initial time back to the component via a subject/property.
        // For simplicity, we'll store it here and the component will read it.
        // **NOTE:** In the final component, we will initialize the timer *inside* the component based on this value.
        // The `RunAssessmentComponent` currently reads this from `meta.durationInMinutes`, we need to change that.
    }


    /**
     * Step 3: Save a single answer.
     * This API is called for every user answer.
     */
    public async saveSingleAnswer(answer: IUserAnswer): Promise<void> {
        // Update local state first for a responsive UI
        const currentAnswers = this.userAnswers.getValue();
        this.userAnswers.next({ ...currentAnswers, [answer.questionId]: answer });
        
        try {
            const result = await lastValueFrom(this.apiService.answerQuestion(this.assessmentId, answer));
            
            if (!result.isValid) {
                // Handle critical validation failure (e.g., time ran out on the server)
                // The C# logic shows this API does the same checks as RunAssessmentMeta/StartAssessment.
                if (result.errorMessage?.includes("انتهى وقت الاختبار المحدد لك")) {
                    this.finishAssessment(); // Force-finish if server says time is up
                } else {
                     // Non-critical, just log. The local answer is kept.
                    console.warn(`Server validation failed for answer to ${answer.questionId}: ${result.errorMessage}`);
                }
            }

        } catch (error) {
            console.error('API Error in saveSingleAnswer:', error);
            // Non-critical: let the user finish, the last local answer will be sent with finishAssessment
        }
    }


    /**
     * Step 4: Finish the assessment.
     * Called when the user clicks finish or the timer hits zero.
     */
    public async finishAssessment(): Promise<void> {
        debugger;
        this.setState('finished');
        const currentAnswers = this.userAnswers.getValue();
        
        var answersforCurrentAssessment = Object.fromEntries( Object.entries(currentAnswers).filter(([key, value])=> {
         var q = this.assessmentData.value?.questions.find( (q)=> q?.id == key )
         return q !== null && q !== undefined;
      })) as Record<string, IUserAnswer>;
    

        
        try {
            const result = await lastValueFrom(this.apiService.finishAssessment(this.assessmentId, answersforCurrentAssessment));
            
            if (!result.isValid) {
                // If finish fails, show the error, but the attempt is over.
                this.setState('error', result.errorMessage);
                return;
            }

            this.examResult$.next(result.model);
            this.userAnswers.next({});
            this.setState('results'); // Transition to showing results

        } catch (error) {
            console.error('API Error in finishAssessment:', error);
            this.setState('error', 'Failed to submit the assessment due to a network or server issue.');
        }
    }

     blockStudentAssessment(): void {
        // This method can be called from the component if the student is blocked.
        // It simply transitions to the 'Blocked' state, which the component can react to by showing a message and hiding the assessment UI.
        
        this.setState('Blocked');
        debugger;
        this.apiService.deactivateAssessmentStudent(this.assessmentId).subscribe(
            result => 
            {
                this.setState('Blocked');
                 if(!result.isValid)
                 {
                    this.customAlert.showError(result.errorMessage || 'Failed to block the assessment attempt. Please contact support.');
                 }
            }
        );

    }
    
    // ... other methods (like mapping DTOs)
}