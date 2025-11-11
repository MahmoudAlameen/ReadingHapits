import { Injectable } from '@angular/core';
import { AssessmentState, IAssessmentCard, IAssessmentData, IAssessmentMeta, IExamResult, IQuestion, IStartAssessmentResponse, IUserAnswer } from '../DTOs/assessments.interfaces';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AssessmentStatus, AssessmentType } from '../enums/assessments.enums';
import { IIdWithName } from '../DTOs/shared.interfaces';
import { APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIService } from './API.Service';
@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

/** Mock database of assessment cards. (Renamed from MOCK_ASSESSMENTS) */
/*
MOCK_ASSESSMENTSCards: IAssessmentCard[] = [
  { id: 101, name: 'PISA Global Literacy 2024', type: AssessmentType.PISA, durationMinutes: 120, subject: 'Language Arts', grade: 10, status: AssessmentStatus.Published },
  { id: 102, name: 'TIMMS Advanced Calculus', type: AssessmentType.TIMMS, durationMinutes: 90, subject: 'Mathematics', grade: 10, status: AssessmentStatus.New },
  { id: 103, name: 'PIRLS Reading Comprehension', type: AssessmentType.PIRLS, durationMinutes: 75, subject: 'Language Arts', grade: 10, status: AssessmentStatus.Finished },
  { id: 104, name: 'Ordinary Biology Midterm', type: AssessmentType.Ordinary, durationMinutes: 50, subject: 'Science', grade: 10, status: AssessmentStatus.Published },
  { id: 105, name: 'PISA Scientific Thinking', type: AssessmentType.PISA, durationMinutes: 100, subject: 'Science', grade: 10, status: AssessmentStatus.Published },
  { id: 106, name: 'TIMMS Geometry & Data', type: AssessmentType.PIRLS, durationMinutes: 60, subject: 'Mathematics', grade: 10, status: AssessmentStatus.Published },
  { id: 107, name: 'Ordinary World History Test', type: AssessmentType.Ordinary, durationMinutes: 40, subject: 'Social Studies', grade: 10, status: AssessmentStatus.Finished },
  { id: 901, name: 'PISA Prep Math', type: AssessmentType.PISA, durationMinutes: 60, subject: 'Mathematics', grade: 9, status: AssessmentStatus.Published },
];
*/

MOCK_LEARNING_SUBJECTS: IIdWithName[] = [
    { id: '1', name: 'Language Arts' },
    { id: '2', name: 'Mathematics' },
    { id: '3', name: 'Science' },
    { id: '4', name: 'Social Studies' },
    { id: '5', name: 'Other' },
];


    constructor(private http : HttpClient, private API: APIService) {
        this.fetchAssessment();
    }

  /** * SIMULATED API CALL: Filters data based on current subject ID and search term.
   * This is the core change to simulate server-side filtering.
   */
fetchAssessmentsByGrade(
  gradeId?: string, 
  search?: string, 
  learningSubjectId?: string,
  assessmentType?: AssessmentType,
  pageNumber?: string ,
  pageSize?: string
): Observable<APIResponseModelList<IAssessmentCard>> {

  // Build params object dynamically, only including non-null/undefined values
  const params = Object.entries({
    gradeId,
    search,
    learningSubjectId,
    assessmentType: assessmentType !== undefined ? assessmentType.toString() : undefined,
    pageNumber: pageNumber ?? undefined,
    pageSize
  })
  .filter(([_, value]) => value !== undefined && value !== null && value !== '')
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value as string }), {} as Record<string, string>);

  return this.http.get<APIResponseModelList<IAssessmentCard>>(
    `${this.API.assessmentsList}`,
    { params }
  ).pipe(
    catchError(err => throwError(() => err.Messages))
  );
    
    
    /*
    return new Promise(resolve => {
      setTimeout(() => {
        const term = searchTerm.toLowerCase().trim();
        let selectedSubjectName = '';

        // 1. Find the subject name corresponding to the selected ID
        if (subjectId) {
          const subject = subjects.find(s => s.id === subjectId);
          selectedSubjectName = subject?.name.toLowerCase() || '';
        }

        // 2. Perform Filtering Logic
        const filtered = this.MOCK_ASSESSMENTSCards.filter(a => {
          const gradeMatch = a.grade === studentGrade;
          
          // Match search term against assessment name
          const searchMatch = a.name.toLowerCase().includes(term);

          // Match subject: true if no subjectId is selected, or if the subject name matches
          const subjectMatch = !subjectId || a.subject.toLowerCase() === selectedSubjectName;
          const asessmenttypematch = !assessmentType || a.type === assessmentType;
          
          return gradeMatch && searchMatch && subjectMatch && asessmenttypematch;
        });
        
        console.log(`[MOCK API] Fetched ${filtered.length} results for search:'${searchTerm}', subjectId:'${subjectId}'`);
        resolve(filtered);

      }, 500); // Simulate API latency
    });
    */
  }
    // Assessment State Management
    public assessmentState = new BehaviorSubject<AssessmentState>('loading');
    public assessmentData = new BehaviorSubject<IAssessmentData | null>(null);
    public userAnswers = new BehaviorSubject<Record<string, IUserAnswer>>({});
    public examResult$ = new BehaviorSubject<IExamResult | null>(null); // New subject for results
    
    // Global/Shared Location for Image Base URL
    private IMAGE_BASE_URL = 'https://assessment-images.com/'; 
    
    // --- MOCK DATA SIMULATING EXTERNAL SQL API RESPONSE ---
    private SIMULATED_API_RESPONSE: IAssessmentData = {
        meta: {
            id: 'exam-123',
            name: 'Introduction to Angular Concepts',
            durationInMinutes: 15, // 15 minutes duration
            subjectNameEn: 'Front-End Development',
            subjectNameAr: "تطوير الواجهات الاماميه",
            isStarted: false ,
            remainingTimeInMinutes: 5,
            questionsCount : 5,
            totalScore: 100
        },
        questions: [
            {
                id: 'q1',
                bodyHtml: 'What is the primary language used in Angular templates? (It might contain an image: <img src="logo1.png" width="50">)',
                choices: [
                    { id: 'c1a', content: 'TypeScript' },
                    { id: 'c1b', content: 'HTML with directives' },
                    { id: 'c1c', content: 'JSX' },
                ]
            },
            {
                id: 'q2',
                bodyHtml: 'Which structural directive is used for conditional rendering? (This question is long to test scrolling and contains an image: <img src="logo2.png" width="50">)',
                choices: [
                    { id: 'c2a', content: '<code>*ngFor</code>' },
                    { id: 'c2b', content: '<code>*ngSwitch</code>' },
                    { id: 'c2c', content: '<code>*ngIf</code>' },
                    { id: 'c2d', content: '<code>*ngBind</code>' },
                ]
            },
            {
                id: 'q3',
                bodyHtml: 'What is the recommended method for state management using modern Angular features?',
                choices: [
                    { id: 'c3a', content: 'RxJS Subjects' },
                    { id: 'c3b', content: 'Angular Signals' },
                    { id: 'c3c', content: 'NGRX Store' },
                ]
            }
        ]
    };

      /** Simulates API call to get subject IDs and names */
  getLearningSubjectIds(): { subscribe: (success: (res: APIResponseModelList<IIdWithName>) => void, error: (err: string) => void) => void } {
    return {
      subscribe: (success, error) => {
        // Simulate success after delay
        setTimeout(() => {
          success({
            isValid: true,
            modelList: this.MOCK_LEARNING_SUBJECTS,
            errorMessage: ''
          });
        }, 300);
      }
    };
  }
    // ----------------------------------------------------------------


    /**
     * SIMULATES API CALL to your SQL backend to fetch assessment data.
     */
    public async fetchAssessment(): Promise<void> {
        this.assessmentState.next('loading');

        try {
            console.log("[MOCK SQL API] Fetching assessment data from external endpoint...");
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            const data: IAssessmentData = JSON.parse(JSON.stringify(this.SIMULATED_API_RESPONSE)); 

            if (data.meta.isStarted) {
                this.assessmentState.next('error');
                console.error("Assessment already started/finished. Preventing re-entry.");
                return; 
            }

            // Processing content (e.g., prefixing image URLs)
            data.questions.forEach((q: IQuestion) => {
                q.bodyHtml = this.prefixImageSrc(q.bodyHtml, this.IMAGE_BASE_URL);
                q.choices.forEach(c => {
                    c.content = this.prefixImageSrc(c.content, this.IMAGE_BASE_URL);
                });
            });
            
            this.assessmentData.next(data);
            this.assessmentState.next('meta'); 
        } catch (error) {
            this.assessmentState.next('error');
            console.error('Failed to fetch assessment data:', error);
        }
    }

    /**
     * Utility to prefix image srcs with the base URL.
     */
    private prefixImageSrc(html: string, baseUrl: string): string {
        return html.replace(/<img\s+(?:[^>]*?\s+)?src=["'](?!http|data:)([^"']*)["']/g, (match, src) => {
            if (src) {
                return `<img src="${baseUrl}${src}"`;
            }
            return match;
        });
    }

    /**
     * Start the assessment.
     
    public startAssessment(): void {
        const data = this.assessmentData.getValue();
        if (data) {
            data.meta.isStarted = true; 
            this.assessmentState.next('taking');
            console.log(`[MOCK SQL API] Marking assessment ${data.meta.id} as started.`);
        }
    }
        */

    /**
     * SIMULATES API CALL to save a single answer to your SQL backend.
     */
    public async saveSingleAnswer(answer: IUserAnswer): Promise<void> {
        const currentAnswers = this.userAnswers.getValue();
        this.userAnswers.next({ ...currentAnswers, [answer.questionId]: answer });
        console.log(`[MOCK SQL API] Saving answer for ${answer.questionId}: ${answer.selectedChoiceId}`);
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network latency
    }

    /**
     * SIMULATES API CALL to submit the final assessment results and then fetch them.
     */
    /*
    public async finishAssessment(): Promise<void> {
        // Step 1: Submission Confirmation
        this.assessmentState.next('finished');
        const finalAnswers = Object.values(this.userAnswers.getValue());

        console.log(`[MOCK SQL API] Submitting final ${finalAnswers.length} answers...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Step 2: Retrieve Results
        await this.fetchResults();
    }
        */
    
    /**
     * SIMULATES API CALL to retrieve the final results of the exam.
     */
    public async fetchResults(): Promise<void> {
        this.assessmentState.next('loading'); // Show loading while fetching/calculating results

        // 1. Mock Grading Logic (Simple: 1 point per answered question)
        const answers = Object.values(this.userAnswers.getValue());
        const assessment = this.assessmentData.getValue();
        if (!assessment) {
            this.assessmentState.next('error');
            return;
        }

        const totalQuestions = assessment.questions.length;
        // Mock: Assume 2 questions were correctly answered (q1 and q3) if they are answered at all.
        const score = answers.filter(a => ['q1', 'q3'].includes(a.questionId) && a.selectedChoiceId !== null).length; 
        
        const maxScore = totalQuestions;
        const percentage = Math.round((score / maxScore) * 100);
        
        let grade: IExamResult['grade'];
        if (percentage >= 80) {
            grade = 'Excellent';
        } else if (percentage >= 50) {
            grade = 'Pass';
        } else {
            grade = 'Fail';
        }
        
        // Mock time taken (Actual time remaining is what's used in App component)
        const timeTakenSeconds = (assessment.meta.durationInMinutes * 60) - (this.assessmentData.getValue()!.meta.durationInMinutes * 60);

        const result: IExamResult = {
            score: answers.filter(a => a.selectedChoiceId !== null).length, 
            assessmentName : "assessment 1",// Total answered count as score
            maxScore,
            percentage,
            grade: (answers.filter(a => a.selectedChoiceId !== null).length > 1) ? 'Pass' : 'Fail', // Simple pass/fail based on answered questions
            timeTakenSeconds: 900 - this.assessmentData.getValue()!.meta.durationInMinutes * 60 // Placeholder, handled in App
        };

        // 2. Simulate network latency for fetching results (500ms)
        await new Promise(resolve => setTimeout(resolve, 500)); 

        this.examResult$.next(result);
        this.assessmentState.next('results'); // Transition to the results view
        console.log("Exam results received and ready for display.");
    }

    /**
     * Calls the run-assessment-meta GET endpoint.
     */
    runAssessmentMetaData(assessmentId: string): Observable<APIResponseModel<IAssessmentMeta>> {
        const params = new HttpParams().set('assessmentId', assessmentId);
        return this.http.get<APIResponseModel<IAssessmentMeta>>(`${this.API.runAssessmentMeta}${assessmentId}`, { params })
        .pipe(
          catchError((err)=>{
            return throwError(()=>err.message);
      }))
  }

    /**
     * Calls the Start POST endpoint.
     */
    startAssessment(assessmentId: string): Observable<APIResponseModel<IStartAssessmentResponse>> {
        // The endpoint is parameterized: assessments/Start/{assessmentId}
        return this.http.post<APIResponseModel<IStartAssessmentResponse>>(`${this.API.startAssessment}${assessmentId}`, {})
         .pipe(
          catchError((err)=>{
            return throwError(()=>err.message);
      }));
    }

    /**
     * Calls the questions GET endpoint.
     */
    getQuestionsByAssessmentId(assessmentId: string): Observable<APIResponseModelList<IQuestion>> {
        return this.http.get<APIResponseModelList<IQuestion>>(`${this.API.getAssessmentQuestions}${assessmentId}`)
         .pipe(
          catchError((err)=>{
            return throwError(()=>err.message);
      }));
    }

    /**
     * Placeholder for the Answer Question API call.
     * Assuming a POST to save the answer, and it returns a validation result.
     */
    answerQuestion(assessmentId: string, answer: IUserAnswer): Observable<APIResponseModel<string>> {
        // Assuming a new API endpoint 'assessments/answer-question'
        const payload = {
            assessmentId: assessmentId,
            questionId: answer.questionId,
            UserAnswer: answer.selectedChoiceId
        };
        return this.http.post<APIResponseModel<any>>(`${this.API.saveAnswer}`, payload)
        .pipe(
          catchError((err)=>{
            return throwError(()=>err.message);
      }));;
    }

    /**
     * Placeholder for the Finish Assessment API call.
     * Assuming a POST to submit all answers and finish the exam.
     */
    finishAssessment(assessmentId: string, answers: Record<string, IUserAnswer>): Observable<APIResponseModel<IExamResult>> {
        // Here you would typically submit the current answers state
        const payload = {
            assessmentId: assessmentId,
            answers: Object.values(answers).map(a => ({
                questionId: a.questionId,
                selectedChoiceId: a.selectedChoiceId
            }))
        };
        // Assuming a new API endpoint 'assessments/Finish'
        return this.http.post<APIResponseModel<IExamResult>>(`${this.API.finishAssessment}`, payload)
        .pipe(catchError((err)=>{
            return throwError(()=>err.message);
      }));;
    }

    calculateExamCardLabel(assessmentStatus: AssessmentStatus, isStartedByStudent: boolean , isFinishedByStudent: boolean)
    {
      var label:string = "";
      if(assessmentStatus == AssessmentStatus.New)
        label = "Coming Soon";

      if(assessmentStatus == AssessmentStatus.Published)
        label = "Published";

      if(assessmentStatus == AssessmentStatus.Finished)
        label = "Finiished"

      return label;
    }
    calculateExamCardButton(assessmentStatus: AssessmentStatus, isStartedByStudent: boolean, isFinishedByStudent: boolean)
    {
      
      var label:string = "";
      var redirectionURL = "";
      var runAssessmentURl = "assessments/run-assessment";
      var viewResultURL = "assessments/view-result"

      if(assessmentStatus == AssessmentStatus.Published)
      {
        if(!isStartedByStudent)
        {
          label = "Start Assessment";
          redirectionURL = runAssessmentURl;
        }
          

        else if ( !isFinishedByStudent)
        {
          label = "Continue";
          redirectionURL = runAssessmentURl;
        }
        else
        {
          label = "View Result";
          redirectionURL = viewResultURL;  
        }
      }
      if(assessmentStatus == AssessmentStatus.Finished)
      {
        if(isStartedByStudent)
        {
          label = "View Result";
          redirectionURL = viewResultURL;

        }

      }
      return {label : label, redirectionURL: redirectionURL};
    }

    getAssessmentResult(assessmentId: string): Observable<APIResponseModel<IExamResult>> 
    {
      return this.http.post<APIResponseModel<IExamResult>>(`${this.API.getAssessmentResult}${assessmentId}`, {})
         .pipe(
           catchError((err)=>{
            return throwError(()=>err.message)}
           ))
         
    }


}