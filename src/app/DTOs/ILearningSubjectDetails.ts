import { ResourceContentType } from "src/app/enums/resource-content-type";
import { LearningResourceStatus, LearningResourceType } from "../enums/learning-resources.enums";
import { AssessmentState } from "./assessments.interfaces";
import { AssessmentStatus, AssessmentType } from "../enums/assessments.enums";

export interface ILearningSubjectDetails
{
    Id : string;
    nameAr : string;
    nameEn : string;
    descriptionAr? : string;
    descriptionEn? : string;
    coverUrl? : string;
    assignedTeachers: IAssignedTeacher[],
    articles? : ILearningResourceCard[];
    books? : ILearningResourceCard[];
    exams? : ISubjectAssessmentCard[];

}

export interface IAssignedTeacher
{
    id: string,
    fullName: string,
    avatarUrl: string
}

export interface IArticleCard
{
    id : string;
    title : string;
    summary : string;
    resourceContentType : ResourceContentType
}
export interface IBookCard
{
    id : string;
    imageUrl : string;
    title : string;
    resourceContentType : ResourceContentType

}
export interface ILearningResourceCard
{
    id: string;
    nameEn: string;
    nameAr: string;
    gradeId: string;
    coverUrl? : string;
    resourceType: LearningResourceType,
    contentResourceType : ResourceContentType;
    status: LearningResourceStatus,
    fileUrl: string;
    creatorName: string;
}

export interface ISubjectAssessmentCard
{
    id: string;
    name : string;
    type : AssessmentType;
    durationInMinutes : number;
    topScorer : ExamCardTopScore;
    status: AssessmentStatus
}

export interface ExamCardTopScore
{
    name : string;
    score : string;
}