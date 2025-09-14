import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
@Component({
  selector: 'app-main-section',
  templateUrl: './Main-Section.html',
  styleUrls: ['./Main-Section.scss'],
})
export class MainSectionComponent implements OnInit {
stats = [
    {
      number: '200+',
      label: 'Professional\nTrainers',
      color: '#fe753f'
    },
    {
      number: '5000+',
      label: 'Students\nTrained',
      color: '#2489d3'
    },
    {
      number: '1000+',
      label: 'Exam taken by\nstudents',
      color: '#f0c932'
    }
  ];

  buttons = [
    {
      text: 'Learning Materials',
      type: 'primary'
    },
    {
      text: 'International Assessments',
      type: 'secondary'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
