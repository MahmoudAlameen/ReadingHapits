import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-Section.html',
  styleUrls: ['./main-Section.scss'],
})
export class MainSectionComponent implements OnInit, OnDestroy {
  stats: any[] = [];
  currentLang: string = 'en';
  mainSectionMediaBaseUrl: string = 'assets/images/main-section/';

  heroImages: string[] = [
    'WhatsApp Image 2026-04-03 at 22.05.07.jpeg',
    'WhatsApp Image 2026-04-07 at 09.49.39.jpeg' 
  ];
  currentImageIndex: number = 0;
  private slideSubscription?: Subscription;

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.loadTranslations();
    this.startHeroSlider();

    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
      this.currentLang = this.translate.currentLang;
    });
  }

  startHeroSlider(): void {
    this.slideSubscription = interval(5000).subscribe(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    });
  }

  loadTranslations(): void {
    const keys = { trainers: 'STATS.TRAINERS', students: 'STATS.STUDENTS', exams: 'STATS.EXAMS' };
    this.translate.stream(Object.values(keys)).subscribe(t => {
      this.stats = [
        { number: '200+', label: t[keys.trainers], color: '#fe753f' },
        { number: '5000+', label: t[keys.students], color: '#2489d3' },
        { number: '1000+', label: t[keys.exams], color: '#f0c932' }
      ];
    });
  }

  navigateToLearningMaterials() { this.router.navigate(['learning-materials']); }
  navigateToAssessments() { this.router.navigate(['/assessments']); }

  ngOnDestroy(): void {
    if (this.slideSubscription) {
      this.slideSubscription.unsubscribe();
    }
  }
}