import { AssessmentType, InternationalAssessmentSubject } from "../enums/assessments.enums";

export interface IInternationalAssessmentTypeCard {
    title: string;
    description: string;
    tags: string[];
    iconSrc: string;
    theme: string; 
    type: AssessmentType;// e.g., 'TIMSS', 'PIRLS', or 'PISA'
    subjects: IAssessmentTypeMaterial[]// e.g., 'PIRLS' or 'PISA'
}
export interface IAssessmentTypeMaterial
{
    id: InternationalAssessmentSubject;
    name: string;
    coverUrl: string;
}
