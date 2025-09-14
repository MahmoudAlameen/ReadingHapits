import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-international-assessments',
  templateUrl: './international-assessments.component.html',
  styleUrls: ['./international-assessments.component.scss']
})
export class InternationalAssessmentsComponent implements OnInit {
  exams = [
    {
      title: 'TIMSS',
      description: 'Trends in International Mathematics & Science Study — item sets with data interpretation.',
      tags: ['Grade 4 / 8', 'Math', 'Science'],
      iconSrc: 'img/vector-2.svg',
      theme: 'timss'
    },
    {
      title: 'PIRLS',
      description: 'Progress in International Reading Literacy Study — passages with comprehension and analysis items.',
      tags: ['Grade 4', 'Reading', 'Comprehension'],
      iconSrc: 'img/vector-3.svg',
      theme: 'pirals'
    },
    {
      title: 'PISA',
      description: 'Reading, Mathematics, and Science literacy for 15-year-olds — scenario-based tasks & applied problems.',
      tags: ['Age 15', 'Reading', 'Math', 'Science'],
      iconSrc: 'img/image.svg',
      theme: 'pisa'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}