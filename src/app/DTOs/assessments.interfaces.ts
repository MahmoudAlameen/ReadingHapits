import { AssessmentStatus, AssessmentType } from "../enums/assessments.enums";

export interface IAssessmentMeta {
    id: string;
    name: string;
    durationInMinutes: number; // Duration is stored in minutes
    subjectName: string;
    isStarted: boolean; 
    remainingTimeInMinutes: number,
    questionsCount: number;
}

export interface IChoice {
    id: string;
    bodyHtml: string;
}

export interface IQuestion {
    id: string;
    bodyHtml: string;
    choices: IChoice[];
}

export interface IAssessmentData {
    meta: IAssessmentMeta;
    questions: IQuestion[];
}

export interface IUserAnswer {
    questionId: string;
    selectedChoiceId: string | null;
}

export interface IExamResult {
    score: number;
    maxScore: number;
    percentage: number;
    assessmentName: string;
    grade: 'Excellent' | 'Pass' | 'Fail';
    timeTakenSeconds: number;
}
export interface IAssessmentCard {
  id: number;
  name: string;
  type: AssessmentType;
  durationMinutes: number;
  learningSubjectId: string;
  gradeId: string;
  gradeName: string;
  status: AssessmentStatus; // Now uses the Enum
  creator: string;
  creationDate: Date;
  subjectName: string;
  isStartedByStudent: boolean,
  isFinishedByStudent: boolean
}
export interface IStartAssessmentResponse {
    remainingTimeInMinutes: number;
}

export type AssessmentState = 'loading' | 'meta' | 'taking' | 'finished' | 'results' | 'error';
