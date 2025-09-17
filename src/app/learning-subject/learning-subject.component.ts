import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LearningSubjectService} from '../core/learning-subject.service';
import { IExamCard } from '../DTOs/ILearningSubjectDetails';
import { ResourceContentType } from 'src/app/enums/resource-content-type'


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

  subjectTitle = 'Mathematics';
  subjectDescription = 'Mathematics is the foundation of logical thinking, problem-solving, and analytical skills. Explore numbers, geometry, algebra, and real-world applications. Our resources include interactive books, articles, and practice exams simulating international assessments.';
  
  // Data for the components
  books = [
    { id: "1", imageUrl: 'https://covers.openlibrary.org/b/id/10523363-L.jpg', title: 'Algebra Essentials', resourceContentType: ResourceContentType.textPages},
    { id : "2", imageUrl: 'https://covers.openlibrary.org/b/id/10958332-L.jpg', title: 'Geometry Basics',resourceContentType: ResourceContentType.textPages },
    { id: "3", imageUrl: 'https://covers.openlibrary.org/b/id/8228691-L.jpg', title: 'Math in Real Life', resourceContentType: ResourceContentType.textPages }
  ];

  articles = [
    { id: "1" ,title: 'Why Algebra Matters', summary: 'Explore the importance of algebra in modern education and how it builds problem-solving skills.',resourceContentType: ResourceContentType.textPages },
    { id: "2", title: 'Geometry in Architecture', summary: 'See how geometric concepts are applied in the design of iconic buildings worldwide.', resourceContentType: ResourceContentType.textPages }
  ];

  exams : IExamCard[] = [
    { id : "1", title: 'PISA 2022 Simulation', meta: 'Status: Not Started | Duration: 90 min', topScorer: { name: 'Ahmed', score: '95%' }, buttonText: 'Take Exam' },
    { id : '2', title:  'TIMSS 2021 Practice', meta: 'Status: In Progress | Duration: 60 min', topScorer: { name: 'Sara', score: '92%' }, buttonText: 'Continue Exam' },
    { id : '3', title: 'PIRLS 2020 Simulation', meta: 'Status: Not Started | Duration: 45 min', topScorer: { name: 'Lina', score: '97%' }, buttonText: 'Take Exam' }
  ];

  constructor(private activeRoute:ActivatedRoute, private learningSubjectService :LearningSubjectService) { }

  ngOnInit(): void {
    this.ExtractIdsFromRoute();
    this.fetchData();
  }

  // A method to simulate fetching data from a backend API
  fetchData(): void {
    // In a real application, you would make HTTP requests here
    // For example: this.http.get('api/books').subscribe(data => this.books = data);

    this.learningSubjectService.getLearningSubjectDetaisl(this.subjectId, this.gradeLevel).subscribe(
      response=>
      {
        if(response.isValid && response.model)
        {
          var subject = response.model
          this.articles = subject.articles;
          this.books = subject.books;
          this.exams = subject.exams;
          this.subjectTitle = subject.title;
          this.subjectDescription = subject.description;
          this.coverUrl = subject.coverUrl;
        }
        else
        {
          alert(response.errorMessage);
        }
      },
      error=>alert(`error during fetching reading rooms fromm API ${error}`)
    )
    console.log('Fetching learning subject data...');
  }

  // A method to change the selected grade
  onGradeChange(event: Event): void {
    const selectedGrade = (event.target as HTMLSelectElement).value;
    console.log(`Grade changed to: ${selectedGrade}`);
    // Add logic here to load content for the selected grade
  }

  ExtractIdsFromRoute() : void
  {
    this.activeRoute.paramMap.subscribe(
          param=>
            {
              let subjectId =param.get("subjectId");
              subjectId !=null ? this.subjectId= subjectId : this.subjectId;
              let gradeId = param.get("gradeId");
              gradeId != null ? this.gradeLevel= gradeId : this.gradeLevel;
            })
  }
}