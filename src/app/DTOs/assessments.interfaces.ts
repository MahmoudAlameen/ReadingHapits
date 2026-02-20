import { AssessmentStatus, AssessmentType } from "../enums/assessments.enums";
import { IAssessmentTypeMaterial } from "./international-assessment-type-card.interface";

export interface IAssessmentMeta {
    id: string;
    name: string;
    durationInMinutes: number; // Duration is stored in minutes
    subjectNameEn: string;
    subjectNameAr: string;
    isStarted: boolean; 
    remainingTimeInMinutes: number,
    questionsCount: number;
    paragraphBody?: string;
    totalScore: number;

}

export interface IChoice {
    id: string;
    content: string;
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
  durationInMinutes: number;
  learningSubjectId: string;
  gradeId: string;
  gradeName: string;
  status: AssessmentStatus; // Now uses the Enum
  creator: string;
  creationDate: Date;
  subjectName: string;
  subjectNameEn: string;
  isStartedByStudent: boolean,
  isFinishedByStudent: boolean
}
export interface IStartAssessmentResponse {
    remainingTimeInMinutes: number;
}

export type AssessmentState = 'loading' | 'meta' | 'taking' | 'finished' | 'results' | 'error';

export interface IAssessmentTypeDetails
{
    type: AssessmentType;
    description: string;
    name:string;
    materials: IAssessmentTypeMaterial[];   
}

