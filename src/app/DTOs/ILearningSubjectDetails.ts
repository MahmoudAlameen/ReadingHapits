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
}
export interface IBookCard
{
    id : string;
    imageUrl : string;
    title : string;
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