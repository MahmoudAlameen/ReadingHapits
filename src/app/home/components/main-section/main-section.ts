import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-main-section',
  templateUrl: './Main-Section.html',
  styleUrls: ['./Main-Section.scss'],
})
export class MainSectionComponent implements OnInit {

  stats: any[] = [];
  buttons: any[] = [];
  currentLang: string = 'en';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {

    this.loadTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
      this.currentLang = this.translate.currentLang;
      console.log("language changed....");
    });
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
/*
    this.stats = [
      {
        number: '200+',
        label: this.translate.get('home.main-section.STATS.TRAINERS').subscribe(res=>res),
        color: '#fe753f'
      },
      {
        number: '5000+',
        label: 'home.main-section.STATS.STUDENTS',
        color: '#2489d3'
      },
      {
        number: '1000+',
        label: this.translate.get('home.main-section.STATS.EXAMS').subscribe((res : string)=>res),
        color: '#f0c932'
      }
    ];

    this.buttons = [
      {
        text: this.translate.instant('home.main-section.BUTTONS.MATERIALS'),
        type: 'primary'
      },
      {
        text: this.translate.instant('home.main-section.BUTTONS.ASSESSMENTS'),
        type: 'secondary'
      }
    ];
    */
  }

  loadTranslations(): void {
    // Define translation keys
    const keys = {
      trainers: 'STATS.TRAINERS',
      students: 'STATS.STUDENTS',
      exams: 'STATS.EXAMS',
      materials: 'BUTTONS.MATERIALS',
      assessments: 'BUTTONS.ASSESSMENTS'
    };

    // Use translate.get() → returns an observable
    this.translate.stream(Object.values(keys)).subscribe(translations => {
      this.stats = [
        { number: '200+', label: translations[keys.trainers], color: '#fe753f' },
        { number: '5000+', label: translations[keys.students], color: '#2489d3' },
        { number: '1000+', label: translations[keys.exams], color: '#f0c932' }
      ];

      this.buttons = [
        { text: translations[keys.materials], type: 'primary' },
        { text: translations[keys.assessments], type: 'secondary' }
      ];
    });
  }
}
