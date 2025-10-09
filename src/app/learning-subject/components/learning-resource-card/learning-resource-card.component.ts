
import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILearningResourceCard } from 'src/app/DTOs/ILearningSubjectDetails';
import { LearningResourceStatus, LearningResourceType } from 'src/app/enums/learning-resources.enums';
import { ResourceContentType } from 'src/app/enums/resource-content-type';

@Component({
  selector: 'app-learning-resource-card',
  templateUrl: './learning-resource-card.component.html',
  styleUrls: ['./learning-resource-card.component.scss']
})
export class LearningResourceCardComponent implements OnInit {
   // Inject Enums into the template context
    public ContentResourceType = ResourceContentType;
    public LearningResourceSatus = LearningResourceStatus;

    // Data Inputs (Core Data)
    @Input() resource!: ILearningResourceCard;
    displayedResourceName: string = '';
    // UI State Inputs (Passed from Parent)
    @Input() subjectName: string = '';
    @Input() gradeName: string = '';  
    @Input() canManageResource: boolean = false;
    @Input() canApproveReject: boolean = false;
    @Input() isApproving: boolean = false; // NEW UI State
    @Input() isPublishing : boolean = false;
    @Input() isRejecting: boolean = false; // NEW UI State
    @Input() actionError: string | undefined; // NEW UI State

    // Output Events
    @Output() viewClicked = new EventEmitter<ILearningResourceCard>();

    // Arabic Dictionaries 
    arabicResourceTypeStatus: Record<LearningResourceType, string> = {
        [LearningResourceType.Book]: "كتاب",
        [LearningResourceType.Article]: "مقالة",
        [LearningResourceType.Vedio]: "فيديو",
    };
    arabiContentResourceTypeStatus: Record<ResourceContentType, string> = {
        [ResourceContentType.textPages]: "نص مكتوب",
        [ResourceContentType.pdf]: "ملف PDF",
        [ResourceContentType.ePub]: "ملف EPUB",
        [ResourceContentType.HTML]: "ملف HTML"
    }
    arabicResourceStatus: Record<LearningResourceStatus, string> = {
        [LearningResourceStatus.Draft]: "مسودة",
        [LearningResourceStatus.InReview]: "قيد المراجعة",
        [LearningResourceStatus.Approved]: "موافق عليه",
        [LearningResourceStatus.Rejected]: "مرفوض",
        [LearningResourceStatus.Published]: "تم النشر"
    }

    constructor(private translateService: TranslateService)
    {}

    ngOnInit(): void 
    {
        this.displayedResourceName =  this.translateService.currentLang === 'ar' ? this.resource.nameAr : this.resource.nameEn;

    }

    canSubmitForReview(): boolean {
        return this.canManageResource && this.resource.status === LearningResourceStatus.Draft;
    }

    CanApproveOrRject(): boolean {
        return this.canApproveReject && this.resource.status === LearningResourceStatus.InReview;
    }

    canPublish()
    {
      return this.canManageResource &&  this.resource.status == LearningResourceStatus.Approved
    }

    // Action Handlers
    onViewClick(): void {
        this.viewClicked.emit(this.resource);
    }


}
