import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAssessmentMeta } from 'src/app/DTOs/assessments.interfaces';

@Component({
  selector: 'app-assessment-meta',
  templateUrl: './assessment-meta.component.html',
  styleUrls: ['./assessment-meta.component.scss']
})
export class AssessmentMetaComponent implements OnInit {

  constructor(private translateService: TranslateService) 
  {
   }
  @Input() meta!: IAssessmentMeta | null;
  displayedSubjectName: string | null = null;
  @Output() onStart = new EventEmitter<void>();
  ngOnInit(): void {
    if(this.meta)
      this.displayedSubjectName =   this.translateService.currentLang == "ar" ? this.meta.subjectNameAr : this.meta.subjectNameEn;

    this.translateService.onLangChange.subscribe(
      cult => 
      {
        if(this.meta)
        {
          this.displayedSubjectName = this.translateService.currentLang == "ar" ? 
          this.meta.subjectNameAr : this.meta.subjectNameEn;

        }

      }
    )

  }

}
