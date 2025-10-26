import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LearningSubjectService} from '../core/learning-subject.service';
import { ISubjectAssessmentCard, ILearningSubjectDetails, ILearningResourceCard } from '../DTOs/ILearningSubjectDetails';
import { ResourceContentType } from 'src/app/enums/resource-content-type'
import { LearningResourcesService } from '../core/learning-resources.service';
import { LearningResourceStatus, LearningResourceType } from '../enums/learning-resources.enums';
import { CustomAlertService } from '../core/custom-alert.service';
import { AlertMessage } from '../classes/AlertMessage';
import { InternationalAssessmentsService } from '../core/international-assessments.service';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from '../core/API.Service';
import { IIdWithName } from '../DTOs/shared.interfaces';
import { AssessmentType } from 'src/app/enums/assessments.enums';
import { APIResponse } from '../classes/APIResponse';


@Component({
  selector: 'app-learning-subject',
  templateUrl: './learning-subject.component.html',
  styleUrls: ['./learning-subject.component.scss']
})
export class LearningSubjectComponent implements OnInit {
  @Input() subjectId!: string; // e.g., 'math', 'science'
  @Input() gradeLevel!: string; // e.g., 'Grade 4', 'Grade 5'
  @Input() coverUrl!: string; // URL for the subject cover image
  @Input() description!: string; // Description of the subject
  learningSubject !: ILearningSubjectDetails;
  subjectTitle = 'Mathematics';
  subjectDescription = 'Mathematics is the foundation of logical thinking, problem-solving, and analytical skills. Explore numbers, geometry, algebra, and real-world applications. Our resources include interactive books, articles, and practice exams simulating international assessments.';
   grades!: IIdWithName[];
   selectedGradeId: string = '';
   pisaExams : ISubjectAssessmentCard[] = [];
   timssExams: ISubjectAssessmentCard[] = [];
   pirlsExams: ISubjectAssessmentCard[] = [];
   ordinaryExams : ISubjectAssessmentCard[] = [];
   isLoading: boolean = false;

  // Data for the components
  /*
  books = [
    { id: "1", imageUrl: 'https://covers.openlibrary.org/b/id/10523363-L.jpg', title: 'Algebra Essentials', resourceContentType: ResourceContentType.textPages},
    { id : "2", imageUrl: 'https://covers.openlibrary.org/b/id/10958332-L.jpg', title: 'Geometry Basics',resourceContentType: ResourceContentType.textPages },
    { id: "3", imageUrl: 'https://covers.openlibrary.org/b/id/8228691-L.jpg', title: 'Math in Real Life', resourceContentType: ResourceContentType.textPages }
  ];

  articles = [
    { id: "1" ,title: 'Why Algebra Matters', summary: 'Explore the importance of algebra in modern education and how it builds problem-solving skills.',resourceContentType: ResourceContentType.textPages },
    { id: "2", title: 'Geometry in Architecture', summary: 'See how geometric concepts are applied in the design of iconic buildings worldwide.', resourceContentType: ResourceContentType.textPages }
  ];

  exams : ISubjectAssessmentCard[] = [
    { id : "1", title: 'PISA 2022 Simulation', meta: 'Status: Not Started | Duration: 90 min', topScorer: { name: 'Ahmed', score: '95%' }, buttonText: 'Take Exam' },
    { id : '2', title:  'TIMSS 2021 Practice', meta: 'Status: In Progress | Duration: 60 min', topScorer: { name: 'Sara', score: '92%' }, buttonText: 'Continue Exam' },
    { id : '3', title: 'PIRLS 2020 Simulation', meta: 'Status: Not Started | Duration: 45 min', topScorer: { name: 'Lina', score: '97%' }, buttonText: 'Take Exam' }
  ];
  */
  alertMessage: AlertMessage = new AlertMessage();
  constructor(
    private activeRoute:ActivatedRoute,
    private learningSubjectService :LearningSubjectService,
    private learningResourceService: LearningResourcesService,
    private internationalAssessmentService : InternationalAssessmentsService,
    private customAlert : CustomAlertService, 
    private translateService: TranslateService,
  private API : APIService) { }


  ngOnInit(): void {
    this.ExtractIdsFromRoute();
  }

  // A method to simulate fetching data from a backend API
  fetchData(): void {
    // In a real application, you would make HTTP requests here
    // For example: this.http.get('api/books').subscribe(data => this.books = data);
    this.isLoading = true;

    this.learningSubjectService.getLearningSubjectDetails(this.subjectId).subscribe(
      response=>
      {
        if(response.isValid && response.model)
        {
          this.learningSubject = response.model;
          this.subjectTitle = this.translateService.currentLang === 'ar' && this.learningSubject.nameAr ? 
          this.learningSubject.nameAr  : (this.learningSubject.nameEn || '');
          this.translateService.onLangChange.subscribe(
            (event)=>
            {
              this.subjectTitle = this.translateService.currentLang === 'ar' && this.learningSubject.nameAr ? 
              this.learningSubject.nameAr  : (this.learningSubject.nameEn || '');
              this.subjectDescription = this.translateService.currentLang === 'ar' && this.learningSubject.descriptionAr ?
              this.learningSubject.descriptionAr  : (this.learningSubject.descriptionEn || '');
            })
          this.subjectDescription = this.translateService.currentLang === 'ar' && this.learningSubject.descriptionAr ?
          this.learningSubject.descriptionAr  : (this.learningSubject.descriptionEn || '');
          this.learningSubject.coverUrl = this.API.base + "LearningSubjects/" + this.learningSubject.coverUrl;

          this.learningSubject.assignedTeachers = this.learningSubject.assignedTeachers.map((t)=>
          ({
            ...t,
            avatarUrl: t.avatarUrl ? this.API.mediaBase + "Users/" + t.avatarUrl : t.avatarUrl
          }))

          console.log(this.learningSubject.assignedTeachers);

          this.GetLearningResources(this.learningSubject.Id, undefined,  LearningResourceStatus.Published);
          this.getExamsBySubjectId(this.learningSubject.Id);

        }
        else
        {
          this.alertMessage.message = response.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage); 
        }
        
      },
      error=>
        {
          this.alertMessage.isDisplayed = true;
          this.alertMessage.message = `error during fetching reading rooms fromm API ${error}`;
          this.customAlert.alert.next(this.alertMessage); 
        }
    )
  }

  // A method to change the selected grade
  onGradeChange(event: Event): void {
    const selectedGrade = (event.target as HTMLSelectElement).value;
    // Add logic here to load content for the selected grade
  }

  ExtractIdsFromRoute() : void
  {
    this.activeRoute.paramMap.subscribe(
          param=>
            {
              let subjectId =param.get("id");
              subjectId !=null ? this.subjectId= subjectId : this.subjectId;
                  this.fetchData();

            })
    this.activeRoute.queryParamMap.subscribe(
      param => 
      {
        let gradeId = param.get("gradeId");
        gradeId != null ? this.gradeLevel= gradeId : this.gradeLevel;
        this.selectedGradeId = gradeId?? '';
        this.getGrades();

      }
    )
  }

  GetLearningResources(subjectId: string, gradeId?: string, status?: LearningResourceStatus)
  {
    
    this.learningResourceService.getLearningResourcesBySubjectId(this.subjectId, gradeId, status).subscribe(
      response=>
      {
        if(response.isValid && response.modelList)
        {
          var resources  = response.modelList.map(t => ({
                        ...t,
                        coverUrl: t.coverUrl != null
                        ? `${this.API.base}LearningResources/Covers/${t.coverUrl}`
                        : t.coverUrl,
                        fileUrl: t.fileUrl != null
                        ? `${this.API.base}LearningResources/Files/${t.fileUrl}`
                        : t.coverUrl
                    } as ILearningResourceCard));
          
          this.learningSubject.books = resources?.filter(r => r.resourceType == LearningResourceType.Book);
          this.learningSubject.articles = resources?.filter(r => r.resourceType == LearningResourceType.Article);
        }
        else
        {
          this.alertMessage.message = response.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage); 
        }
      },
      error=>
        {
          this.alertMessage.isDisplayed = true;
          this.alertMessage.message = `error during fetching reading rooms fromm API ${error}`;
          this.customAlert.alert.next(this.alertMessage);
        }
        
    )
    console.log('Fetching learning subject data...');
  }

  getExamsBySubjectId(subjectId: string)
  {
    this.internationalAssessmentService.getExamsBySubjectId(this.subjectId, this.selectedGradeId).subscribe(
      response=>
      {
        if(response.isValid && response.modelList)
        {
          this.learningSubject.exams = response.modelList;
          this.pisaExams = this.learningSubject.exams?.filter(e => e.type == AssessmentType.PISA)
          this.pirlsExams = this.learningSubject.exams?.filter(e => e.type == AssessmentType.PIRLS)
          this.timssExams = this.learningSubject.exams?.filter(e => e.type == AssessmentType.TIMMS)
          this.ordinaryExams = this.learningSubject.exams?.filter(e => e.type == AssessmentType.Ordinary)
        }
        else
        {
          this.alertMessage.message = response.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage); 
        }
        this.isLoading = false;
      },
      error=>
        {
          this.alertMessage.isDisplayed = true;
          this.alertMessage.message = `error during fetching reading rooms fromm API ${error}`;
          this.customAlert.alert.next(this.alertMessage);
          this.isLoading = false;
        }
    )
    
    console.log('Fetching learning subject data...');
  }

  
 getGrades() {
 this.learningSubjectService.getGradesIdsWIthNames().subscribe(
 res => {
 if (res.isValid && res.modelList != null) {
 this.grades = res.modelList;
 } else {
 this.alertMessage.message = res.errorMessage;
 this.alertMessage.isDisplayed = true;
 this.customAlert.alert.next(this.alertMessage);
 }
 },
 err => {
 this.alertMessage.message = err;
 this.alertMessage.isDisplayed = true;
 this.customAlert.alert.next(this.alertMessage);
});}
}
