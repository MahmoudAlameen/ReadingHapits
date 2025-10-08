import { Injectable } from '@angular/core';
import { AssessmentState, AssessmentType, IAssessmentCard, IAssessmentData, IExamResult, IQuestion, IUserAnswer } from '../DTOs/assessments.interfaces';
import { BehaviorSubject } from 'rxjs';
import { AssessmentStatus } from '../enums/assessments.enums';
import { IIdWithName } from '../DTOs/shared.interfaces';
import { APIResponseModelList } from '../classes/APIResponse';
@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

/** Mock database of assessment cards. (Renamed from MOCK_ASSESSMENTS) */
 MOCK_ASSESSMENTSCards: IAssessmentCard[] = [
  { id: 101, name: 'PISA Global Literacy 2024', type: 'PISA', durationMinutes: 120, subject: 'Language Arts', grade: 10, status: AssessmentStatus.Published },
  { id: 102, name: 'TIMMS Advanced Calculus', type: 'TIMMS', durationMinutes: 90, subject: 'Mathematics', grade: 10, status: AssessmentStatus.ComingSoon },
  { id: 103, name: 'PIRLS Reading Comprehension', type: 'PIRLS', durationMinutes: 75, subject: 'Language Arts', grade: 10, status: AssessmentStatus.Finished },
  { id: 104, name: 'Ordinary Biology Midterm', type: 'Ordinary', durationMinutes: 50, subject: 'Science', grade: 10, status: AssessmentStatus.Published },
  { id: 105, name: 'PISA Scientific Thinking', type: 'PISA', durationMinutes: 100, subject: 'Science', grade: 10, status: AssessmentStatus.Published },
  { id: 106, name: 'TIMMS Geometry & Data', type: 'TIMMS', durationMinutes: 60, subject: 'Mathematics', grade: 10, status: AssessmentStatus.Published },
  { id: 107, name: 'Ordinary World History Test', type: 'Ordinary', durationMinutes: 40, subject: 'Social Studies', grade: 10, status: AssessmentStatus.Finished },
  { id: 901, name: 'PISA Prep Math', type: 'PISA', durationMinutes: 60, subject: 'Mathematics', grade: 9, status: AssessmentStatus.Published },
];

MOCK_LEARNING_SUBJECTS: IIdWithName[] = [
    { id: '1', name: 'Language Arts' },
    { id: '2', name: 'Mathematics' },
    { id: '3', name: 'Science' },
    { id: '4', name: 'Social Studies' },
    { id: '5', name: 'Other' },
];

  /** * SIMULATED API CALL: Filters data based on current subject ID and search term.
   * This is the core change to simulate server-side filtering.
   */
  fetchAssessmentsByGrade(
    studentGrade: number, 
    searchTerm: string, 
    subjectId: string,
    subjects: IIdWithName[],
    assessmentType?: AssessmentType | null // Pass the subjects list for lookup
  ): Promise<IAssessmentCard[]> {
    
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
            subjectName: 'Front-End Development',
            isStarted: false 
        },
        questions: [
            {
                id: 'q1',
                bodyHtml: 'What is the primary language used in Angular templates? (It might contain an image: <img src="logo1.png" width="50">)',
                choices: [
                    { id: 'c1a', bodyHtml: 'TypeScript' },
                    { id: 'c1b', bodyHtml: 'HTML with directives' },
                    { id: 'c1c', bodyHtml: 'JSX' },
                ]
            },
            {
                id: 'q2',
                bodyHtml: 'Which structural directive is used for conditional rendering? (This question is long to test scrolling and contains an image: <img src="logo2.png" width="50">)',
                choices: [
                    { id: 'c2a', bodyHtml: '<code>*ngFor</code>' },
                    { id: 'c2b', bodyHtml: '<code>*ngSwitch</code>' },
                    { id: 'c2c', bodyHtml: '<code>*ngIf</code>' },
                    { id: 'c2d', bodyHtml: '<code>*ngBind</code>' },
                ]
            },
            {
                id: 'q3',
                bodyHtml: 'What is the recommended method for state management using modern Angular features?',
                choices: [
                    { id: 'c3a', bodyHtml: 'RxJS Subjects' },
                    { id: 'c3b', bodyHtml: 'Angular Signals' },
                    { id: 'c3c', bodyHtml: 'NGRX Store' },
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

    constructor() {
        this.fetchAssessment();
    }

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
                    c.bodyHtml = this.prefixImageSrc(c.bodyHtml, this.IMAGE_BASE_URL);
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
     */
    public startAssessment(): void {
        const data = this.assessmentData.getValue();
        if (data) {
            data.meta.isStarted = true; 
            this.assessmentState.next('taking');
            console.log(`[MOCK SQL API] Marking assessment ${data.meta.id} as started.`);
        }
    }

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
    public async finishAssessment(): Promise<void> {
        // Step 1: Submission Confirmation
        this.assessmentState.next('finished');
        const finalAnswers = Object.values(this.userAnswers.getValue());

        console.log(`[MOCK SQL API] Submitting final ${finalAnswers.length} answers...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Step 2: Retrieve Results
        await this.fetchResults();
    }
    
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
            score: answers.filter(a => a.selectedChoiceId !== null).length, // Total answered count as score
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
}