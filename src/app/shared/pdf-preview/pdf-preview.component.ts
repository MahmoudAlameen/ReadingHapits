import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debug } from 'console';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { APIService } from 'src/app/core/API.Service';
import { ContentService } from 'src/app/core/content.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { LearningResourcesService } from 'src/app/core/learning-resources.service';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';
import { ILearningResource } from 'src/app/DTOs/learning-resource.interfaces';
import { LearningResourceType } from 'src/app/enums/learning-resources.enums';
import { ResourceContentType } from 'src/app/enums/resource-content-type';
@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss'],
})
export class PdfPreviewComponent implements OnInit, OnDestroy {
  // Change the type to Uint8Array to hold the binary data
  pdfSrc!: Uint8Array | string ; 
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  loadSuccess: boolean = true;
  readTimeStart:string|null=null;
  readTimeEnd:string|null=null;
  alertMessage:AlertMessage= new AlertMessage();
  resourceId: string| null = '';
  readingStarted: boolean = false;
  openBookAnimation:boolean=false;
  learningResource!: ILearningResource;
  rightFlipper!:HTMLElement |null
  leftFlipper!:HTMLElement |null
  constructor(
    private route: ActivatedRoute,
    private customAlert : CustomAlertService,
    private readingRoomService: ReadingRoomsService,
    public translateService: TranslateService,
    private learningResourceService: LearningResourcesService,
    private Api: APIService,
    private contentService: ContentService
) { }

  afterLoadComplete(pdf: any) {
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
  }

  // ... (nextPage and prevPage methods remain the same)
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  ngOnInit(): void {
    //const url = './assets/pdf/pdf-test.pdf'; // Use a correct URL for your PDF
    this.route.queryParamMap.subscribe(p =>
    {
      this.resourceId = p.get("resourceId")
      if(this.resourceId)
        this.getResourceData(this.resourceId);
      else
      this.loadSuccess = false;
    }
    ) 
  }

  getPdfFile(url: string)
  {        
    this.contentService.getPdfFile(url).subscribe(
          (blob: Blob) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
          // 1. Cast the result to ArrayBuffer
          const arrayBuffer = e.target.result as ArrayBuffer;
          
          // 2. Convert ArrayBuffer to Uint8Array, which ng2-pdf-viewer prefers
          this.pdfSrc = new Uint8Array(arrayBuffer);
        };

        // 3. Read the Blob as an ArrayBuffer
        reader.readAsArrayBuffer(blob);
      },
      (error) => {
        this.loadSuccess = false;
      }
    );
  }


  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    if(this.openBookAnimation)
    {
      let leftSide=document.querySelector(".left");
      let rightSide=document.querySelector(".right");
      leftSide?.classList.add("leftCover");
      rightSide?.classList.add("rightCover");
    }
  }
  openBook()
  {
    // before open process
    this.openBookAnimation=true;
    let cover=document.querySelector(".cover");
    let bookSlider=document.querySelector("bookSlider");
    bookSlider?.classList.remove("hide");
 
    cover?.classList.add("rotate90");
    setTimeout(()=>
    {
      setTimeout(()=>
      {
        this.openBookAnimation=false;
        this.readingStarted = true;
      },1500)

    },500)
    this.startRead();

  }

  getResourceData(resourceId: string)
  {
    this.learningResourceService.getLearningResource(resourceId).subscribe(
      res => 
      {
        if(res.isValid && res.model)
        {
          this.learningResource = res.model;
          this.learningResource.coverUrl = this.learningResource.coverUrl ? 
          `${this.Api.mediaBase}LearningResources/Covers/${this.learningResource.coverUrl}` : this.learningResource.coverUrl;
          if(this.learningResource.fileURL)
            this.getPdfFile(`${this.Api.mediaBase}LearningResources/Files/${this.learningResource.fileURL}`)
        }
        else
        {
          this.alertMessage.message = res.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage);
        }

      },
      err => 
      {
        this.alertMessage.message = err;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }
  // calculate read time 
  startRead()
  {
    let date = new Date();
    this.readTimeStart= `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  endRead()
  {
    this.readingStarted = false;
    let date= new Date();
    this.readTimeEnd = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(this.readTimeStart == null || this.readTimeEnd == null)
        return;

      debugger;

   if (this.learningResource.resourceType === LearningResourceType.Book) {
  this.readingRoomService.addBookTimeRead(
    this.resourceId as string,
    this.readTimeStart as string,
    this.readTimeEnd as string
  ).subscribe(this.handleTimeReadResponse.bind(this));
} else {
  this.readingRoomService.addArticleTimeRead(
    this.resourceId as string,
    this.readTimeStart as string,
    this.readTimeEnd as string
  ).subscribe(this.handleTimeReadResponse.bind(this));
}
  }

    KillAnimation(elem:HTMLElement, animation:string,mellySeconds:number)
  {
    setTimeout(()=>
    {
      elem.classList.remove(animation);
      elem.classList.remove("inFront");
      switch(animation)
      {
        case "overlapRight":
          break;
        case "overlapLeft":
          break;  
      }

    },mellySeconds) 
  }

  ngOnDestroy()
  {
    if(this.readTimeStart== null || this.readTimeEnd == null)
        return;
    this.endRead();    
  }

  private handleTimeReadResponse(response: any) {
  if (response.isValid) {
    this.alertMessage.isDisplayed = true;
    this.alertMessage.message = this.translateService.currentLang === 'ar'
      ? `وقت القراءة الكلى ${response.model}`
      : `Total Time Read ${response.model}`;
    this.customAlert.alert.next(this.alertMessage);
    this.readTimeStart = null;
    this.readTimeEnd = null;
  }
   else {
    this.alertMessage.isDisplayed = true;
    this.alertMessage.message = `${response.errorMessage}`;
    this.customAlert.alert.next(this.alertMessage);
  }
}
}
