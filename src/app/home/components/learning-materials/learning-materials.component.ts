import { Component, OnInit } from '@angular/core';
import { ILearningSubjectCard } from 'src/app/DTOs/ILearningSubjectCard';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangChangeEvent } from '@ngx-translate/core';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { AlertMessage } from 'src/app/classes/AlertMessage';

@Component({
  selector: 'app-learning-materials',
  templateUrl: './learning-materials.component.html',
  styleUrls: ['./learning-materials.component.scss']
})
export class LearningMaterialsComponent implements OnInit {
  private langChangeSub!: Subscription;
  alertMessage : AlertMessage = new AlertMessage();

  constructor(private learningSubjectService: LearningSubjectService,
    private translate: TranslateService,
  private customAlert : CustomAlertService) { }

  ngOnInit(): void {
    this.getLearningSubjectCards();
    this.langChangeSub = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.getLearningSubjectCards();
      }
    );
  }

  learningMaterials : ILearningSubjectCard[] = []
  /*[
    {
      id: "1",
      nameEn: 'English Materials',
      nameAr : "اللغه الانجليزيه",
      descriptionEn: 'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor',
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverUrl: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
    },
    {
      id: "2",
      nameEn: 'Mathematics',
      nameAr : "الرياضيات",
      descriptionEn: 'A course covering fundamental mathematical concepts.',
      descriptionAr: 'دوره تغطي المفاهيم الرياضيه الاساسيه',
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverUrl: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
    },
    {
      id: "3",
      nameEn: 'History of Art',
      nameAr : "تاريخ الفن",
      descriptionEn: 'Explore art from ancient times to modern day.',
      descriptionAr: 'استكشف الفن من العصور القديمه الي العصر الحديث',
      //
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverUrl: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
    },
    {
      id: "4",
      nameEn: 'Computer Science',
      nameAr : "علوم الحاسب",
      descriptionEn: 'An introduction to programming and algorithms.',
      descriptionAr: 'مقدمه في البرمجه والخوارزميات',
      //
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverUrl: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
    },
    {
      id: "5",
      nameEn: 'Physics',
      nameAr : "الفيزياء",
      descriptionEn: 'Understanding the laws of the universe.',
      descriptionAr: 'فهم قوانين الكون',
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverUrl: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
    },
    // ... add more materials
  ];
  */

  showAll = false;

  get materialsToShow() {
    return this.showAll ? this.learningMaterials : this.learningMaterials.slice(0, 4);
  }

  getLearningSubjectCards()
  {
    this.learningSubjectService.getLearningSubjectsCards().subscribe(
      response=>
      {
        if(response.isValid && response.modelList)
        {
          this.learningMaterials = response.modelList;
        }
        else
        {
          this.alertMessage.message = response.errorMessage; 
          this.alertMessage.isDisplayed = true; 
          this.customAlert.alert.next(this.alertMessage);
          alert(response.errorMessage);
        }
      },
      error=>
      {
        this.alertMessage.message = `error during fetching learning subjects from API ${error}`;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    );

  }

  onSeeAll(): void {
    this.showAll = true;
  }
}