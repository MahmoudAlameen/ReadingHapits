import { Component, OnInit } from '@angular/core';
import { ILearningSubjectCard } from 'src/app/DTOs/ILearningSubjectCard';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangChangeEvent } from '@ngx-translate/core';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { APIService } from 'src/app/core/API.Service';

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
  private customAlert : CustomAlertService,
private api: APIService) { }

  ngOnInit(): void {
    this.getLearningSubjectCards();
    this.langChangeSub = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.getLearningSubjectCards();
      }
    );
  }

  learningMaterials : ILearningSubjectCard[] = []
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
          this.learningMaterials = response.modelList.map((l) => (
            {
              ...l,
              assignedTeachersAvatars : l.assignedTeachers.map((t) => ({
                ...t,
                avatarUrl : t.avatarUrl ? `${this.api.mediaBase}Users/${t.avatarUrl}` : t.avatarUrl
              }))
            }
          ));
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