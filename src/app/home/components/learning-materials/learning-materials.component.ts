import { Component, OnInit } from '@angular/core';
import { ILearningSubjectCard } from 'src/app/DTOs/ILearningSubjectCard';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-learning-materials',
  templateUrl: './learning-materials.component.html',
  styleUrls: ['./learning-materials.component.scss']
})
export class LearningMaterialsComponent implements OnInit {
  private langChangeSub!: Subscription;

  constructor(private learningSubjectService: LearningSubjectService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.getLearningSubjectCards();
    this.langChangeSub = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.getLearningSubjectCards();
      }
    );
  }

  learningMaterials : ILearningSubjectCard[] = [
    {
      id: "1",
      title: 'English Materials',
      description: 'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor',
      duration: '3 Month',
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
      coverImage: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
      altText: 'English learning materials course cover image'
    },
    {
      id: "2",
      title: 'Mathematics',
      description: 'A course covering fundamental mathematical concepts.',
      duration: '6 Month',
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverImage: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
      altText: 'Mathematics course cover image'
    },
    {
      id: "3",
      title: 'History of Art',
      description: 'Explore art from ancient times to modern day.',
      duration: '4 Month',
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverImage: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
      altText: 'History of Art course cover image'
    },
    {
      id: "4",
      title: 'Computer Science',
      description: 'An introduction to programming and algorithms.',
      duration: '8 Month',
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
      coverImage: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
      altText: 'Computer Science course cover image'
    },
    {
      id: "5",
      title: 'Physics',
      description: 'Understanding the laws of the universe.',
      duration: '7 Month',
      teachers: [
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png',
        'https://c.animaapp.com/6nrWQIOk/img/image-12-5@2x.png'
      ],
      coverImage: 'https://c.animaapp.com/6nrWQIOk/img/learning-material-cards-card1-cover-section-1@2x.png',
      altText: 'Physics course cover image'
    },
    // ... add more materials
  ];

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
          alert(response.errorMessage);
        }
      },
      error=>alert(`error during fetching learning subjects from API ${error}`)
    );

  }

  onSeeAll(): void {
    this.showAll = true;
  }
}