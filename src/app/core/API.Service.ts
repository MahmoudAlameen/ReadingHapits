import { Injectable } from '@angular/core';
@Injectable
(
    {
        providedIn:'root'
    }
)
export class APIService
{
    //base:string= "https://www.readinghapitsapi.somee.com/"
    //mediaBase: string = "https://www.readinghapitsapi.somee.com/"
    base:string="https://localhost:7107/";
    mediaBase: string= "https://localhost:7107/";
    AddUser:string=this.base+"users/addUser/";
    UserLogin=this.base+"users/login";
    UserLogout = this.base +"users/logout";
    AuthenticateUser=this.base+"users/isAuthorizedUser";
    ReadingRooms=this.base+"readingRooms/readingRoomsCards";
    GetReadingRoom=this.base+"readingRooms/getReadingRoom";
    GetBook=this.base+"books/getBook";
    GetArticle=this.base+"articles/getArticle";
    bookPagesNumber = this.base + "books/book/pagesNumber";

    /***reports */
    private report:string ="reports"
    visitReadingRoom = `${this.base}${this.report}/reading-rooms/visit/`;
    addBookTimeRead = `${this.base}${this.report}/books/add-read-time`;
    addArticleTimeRead = `${this.base}${this.report}/articles/add-read-time`;

    /***future skills */
    // learning subjects 

    uploadFile  = this.mediaBase + "files/upload"
    LearningSubjectIds = this.base + "learning-subjects-Ids";
    learninSubjectsCards = this.base + "learning-subjects";
    learningSubjectDetails = this.base + "learning-subjects/details/";
    learningResourcesBySubject = this.base + "learning-resources/"; 
    examsBySubjectId = this.base + "assessments/subject/";
    gradesIds = this.base + "grades-Ids";
    assessmentsList = this.base + "assessments";
    getUserGrade = this.base + "users/grade";
    getUserData = this.base + "users/user-data"
    resourcePages = this.base + "learning-resources/resourcepages/";
    runAssessmentMeta = this.base + "assessments/run-assessment-meta/";
    startAssessment = this.base + "assessments/Start/";
    finishAssessment = this.base + "assessments/finish";
    submitAnswer = this.base + "assessments/submit-answer/";
    getAssessmentQuestions = this.base + "assessments/questions/";
    saveAnswer = this.base + "assessments/save-answer";
    getAssessmentResult = this.base + "assessments/view-result/";
    internationalAssessmentsVedio = this.base + "shared/inernationalAssessmentDescriptiveVedio/"
    getLearningResource = this.base + "learning-resources/resource/"
    blockAssessmentStudent = this.base + "assessments/block-student/";

    constructor()
    {
        
    }

}