import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-international-assessment-card',
  templateUrl: './international-assessment-card.component.html',
  styleUrls: ['./international-assessment-card.component.scss']
})
export class InternationalAssessmentCardComponent implements OnInit {

  @Input() exam: any;

  constructor() {}

  ngOnInit(): void {
  }

  onStartNow(): void {
    console.log(`Starting ${this.exam.title} practice...`);
  }
}