import { ResourceContentType } from "src/app/enums/resource-content-type";

export interface ILearningSubjectDetails
{
    title : string;
    description : string;
    coverUrl : string;
    articles : IArticleCard[];
    books : IBookCard[];
    exams : IExamCard[];

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

export interface IExamCard
{
    id: string;
    meta : string;
    title : string;
    topScorer : ExamCardTopScore;
    buttonText : string;
}

export interface ExamCardTopScore
{
    name : string;
    score : string;
}