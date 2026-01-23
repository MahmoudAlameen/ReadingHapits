import { Component, Input, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { Book } from 'src/app/classes/Book';
import { BookPage } from 'src/app/classes/BookPage';
import { APIService } from 'src/app/core/API.Service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { ReadingRoomsService } from 'src/app/core/reading-rooms.service';
import { SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { ContentLanguage } from 'src/app/enums/contentLanguage.enum';
import { ReadingDirection } from 'src/app/enums/ReadingDirection.enum';

@Component({
  
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
@Input() bookId!:string;
userId:string='';
book:Book=new Book();
bookPages!:BookPage[];
leftPage:number=-1;
rightPage:number=-1;
rightFlipper!:HTMLElement |null
leftFlipper!:HTMLElement  |null
openBookAnimation:boolean=false;
readTimeStart:string|null=null;
readTimeEnd:string|null=null;
alertMessage:AlertMessage= new AlertMessage();


currentRightPage = -1;
currentLeftPage = -1;

get readingDirection(): ReadingDirection {
  return this.book.contentLanguage === ContentLanguage.Arabic
    ? ReadingDirection.RTL
    : ReadingDirection.LTR;
}

get nextPageStep(): number {
  return 2;
}

get previousPageStep(): number {
  return -2;
}
get firstRightPage(): number {
  return this.readingDirection === ReadingDirection.RTL ? 0 : 1;
}

get firstLeftPage(): number {
  return this.readingDirection === ReadingDirection.RTL ? 1 : 0;
}
get isBookOpen(): boolean {
  return this.currentRightPage >= 0;
}
constructor(
  private API: APIService,
  private readingRoomService: ReadingRoomsService,
  private ActiveRoute : ActivatedRoute,
  private SessioStorage: SessionStorageService, 
  private SessionKeys: SessionStorageKeysService,
  private customAlert:CustomAlertService) { }
  
  ngOnDestroy()
  {
    if(this.readTimeStart== null || this.readTimeEnd == null)
        return;
    this.endRead();    

  }
  ngOnInit(): void {
    this.setup();
  }

  getBook()
  {
    this.readingRoomService.getBook(this.bookId).subscribe(
      response=>
      {
        if(response.isValid)
        {
          this.book = response.model as Book;
          this.bookPages= this.book.pages;
          this.setCover();
        }
        else
        {
          alert(response.errorMessage);
        }
      }
    )
  }

  setCover()
  {
    if(this.book.cover)
    {
      this.book.cover= this.API.mediaBase + "LearningResources/Covers/" + this.book.cover;
    }
  }

  ngAfterViewChecked(): void 
  {
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
  
  onLeftPageClick(flipper: HTMLElement): void {
   this.moveLeftPageContentToTheRightFlipper();
  if (this.readingDirection === ReadingDirection.RTL) {
    this.turnPageForward(flipper);
  } else {
    this.turnPageBackward(flipper);
  }
}

onRightPageClick(flipper: HTMLElement): void {
  this.moveRightPageContentToTheFlipper();
  if (this.readingDirection === ReadingDirection.RTL) {
    this.turnPageBackward(flipper);
  } else {
    this.turnPageForward(flipper);
  }
}

  turnPageForward(flipper: HTMLElement): void {
  if (this.isAtEnd()) {
    this.closeBook();
    return;
  }

  this.animateFlip(flipper, 'forward');
  this.moveForward();
}

turnPageBackward(flipper: HTMLElement): void {
  if (this.isAtBeginning()) {
    this.closeBook();
    return;
  }

  this.animateFlip(flipper, 'backward');
  this.moveBackward();
}


moveForward(): void {
    this.currentLeftPage += 2;
    this.currentRightPage += 2;
}

moveBackward(): void {
    this.currentLeftPage -= 2;
    this.currentRightPage -= 2;
}

isAtEnd(): boolean {
  const lastPageIndex = this.bookPages.length - 1;

  return (
    this.currentLeftPage >= lastPageIndex ||
    this.currentRightPage >= lastPageIndex
  );
}

isAtBeginning(): boolean {
  return this.currentLeftPage <= 0 || this.currentRightPage <= 0;
}

 resetPages()
 {
    this.currentLeftPage = -1;
    this.currentRightPage = -1
}

  // moving the content from the page to the flipper 
  moveRightPageContentToTheFlipper()
  {
    let page=document.querySelector(".rightPage");
    let flipper=document.querySelector(".rightFlipper");
    this.movePageContent(page,flipper);
  }
  moveLeftPageContentToTheRightFlipper()
  {
    let page=document.querySelector(".leftPage");
    let flipper=document.querySelector(".leftFlipper");
    this.movePageContent(page,flipper);
  }

  movePageContent(source:Element | null,destination:Element |null)
  {
    if(source!=null && destination !=null)
    destination.innerHTML=source.innerHTML;

  }
  

  openBook(): void
  {
    this.openBookAnimation = true;
    this.openBookAnimate();
    setTimeout(() => {
    this.currentRightPage = this.firstRightPage;
    this.currentLeftPage = this.firstLeftPage;
    setTimeout(() => {
      this.openBookAnimation = false;
    }, 1500);
    }, 500);
    this.startRead();
  }

  closeBook()
  {
    this.closeBookAnimate();
    setTimeout(()=>
    {
      this.resetPages();
    },1000)
    this.endRead();

  }

  /// animations :- flipper anmation , open ,close book animation 
animateFlip(flipper: HTMLElement, direction: 'forward' | 'backward'): void {
  const cssClass =
    direction === 'forward'
      ? this.readingDirection === ReadingDirection.RTL ? 'overlapRight' : 'overlapLeft'
      : this.readingDirection === ReadingDirection.RTL ? 'overlapLeft' : 'overlapRight';

  flipper.classList.add(cssClass, 'inFront');

  setTimeout(() => {
    flipper.classList.remove(cssClass, 'inFront');
  }, 1500);
}
  openBookAnimate()
  {
    let cover=document.querySelector(".cover");
    let bookSlider=document.querySelector("bookSlider");
    bookSlider?.classList.remove("hide");
    cover?.classList.add("rotate90");

  }
  closeBookAnimate()
  {
    let leftSide=document.querySelector(".left");
    let rightSide=document.querySelector(".right");
    let bookSlider=document.querySelector(".bookSlider");
    bookSlider?.classList.add("hide");
    leftSide?.classList.add("rotate90");
    rightSide?.classList.add("rotateMinus90");
  }
  startRead()
  {
    let date = new Date();
    this.readTimeStart= `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  endRead()
  {
    let date= new Date();
    this.readTimeEnd = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(this.readTimeStart == null || this.readTimeEnd == null)
        return;
    this.readingRoomService.addBookTimeRead(this.bookId, this.readTimeStart as string, this.readTimeEnd as string).subscribe(
      response=>
      {
        if(response.isValid)
        {
          this.alertMessage.isDisplayed = true;
          this.alertMessage.message = `وقت القراءة الكلى  ${response.model}`
          this.customAlert.alert.next(this.alertMessage);
          this.readTimeStart=null;
          this.readTimeEnd= null;
        }
        else
        {
          this.alertMessage.isDisplayed= true;
          this.alertMessage.message= `r${response.errorMessage}`;
          this.customAlert.alert.next(this.alertMessage);
        }
      }
      ,err=>
      {
        this.alertMessage.message = `${err}`;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }

  setup()
  {
    this.userId=this.SessioStorage.getValue(this.SessionKeys.userId)?? "";
    this.ActiveRoute.paramMap.subscribe(
      param=>
      {
        let id=param.get("id");
        this.bookId=id?? '00000000-0000-0000-0000-000000000000';
        this.getBook();
      } 
    )
  }
}
