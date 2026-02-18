// assessment-popup.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAssessmentTypeDetails } from 'src/app/DTOs/assessments.interfaces';
@Component({
  selector: 'app-assessment-type-popup',
  templateUrl: './assessment-type-popup.component.html',
  styleUrls: ['./assessment-type-popup.component.scss']
})
export class AssessmentTypePopupComponent implements OnInit {
@Input() data: IAssessmentTypeDetails | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closePopup() {
    this.close.emit();
  }
  ngOnInit(): void {
    
  }

  navigateToAssessment(material: string) {
    if (this.data) {
      // Redirecting and passing assessment type and material as query params
      this.router.navigate(['/assessments'], {
        queryParams: { 
          type: this.data.type, 
          subject: material 
        }
      });
      this.closePopup();
    }
  }

}
