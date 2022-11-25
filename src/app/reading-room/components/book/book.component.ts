import { animation } from '@angular/animations';
import { ReadKeyExpr } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Book } from 'src/app/classes/Book';
import { BookPage } from 'src/app/classes/BookPage';
import { ContentService } from 'src/app/core/content.service';
import { ReadingRoomRepositoryService } from 'src/app/core/reading-room-repository.service';
import { pageType } from 'src/app/enums/PagType';

@Component({
  
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
@Input() bookId!:number;
book:Book=new Book();
bookPages!:BookPage[];
leftPage:number=-1;
rightPage:number=-1;
rightFlipper!:HTMLElement |null
leftFlipper!:HTMLElement  |null
openBookAnimation:boolean=false;

constructor(private readingRoomRepository:ReadingRoomRepositoryService,private contentservice:ContentService) { }

  ngOnInit(): void {

    this.book=this.readingRoomRepository.getBook(this.bookId);
    this.book.cover="./assets/images/cover.jpg";
    this.contentservice.getBookPages(this.book.id).subscribe(
      bookPages=>
      {
        console.log(bookPages)
        let c=0;
        for(let page of bookPages)
        {
          this.contentservice.getFile(page.content,page.type,"bookPage").subscribe(
            file=>
            {
             // this.contentservice.readFile(page,file);
             page.content=file;
            },
            err=>alert(err)
          )

        }
        this.bookPages=bookPages;
      }
    )
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
      console.log(this.leftFlipper)
    }
  }

  overlapPage(direction:string, overlaped:HTMLElement)
  {
    switch(direction)
    {
      case "right":
        if(this.leftPage>=this.bookPages.length-1)
        {
          this.closeBook();
          //this.overlapAnimation(overlaped,"closeBook");
         // setTimeout(()=>{this.resetPages();},1000)
        }
        else
        {
          this.overlapAnimation(overlaped,"right");
          this.onFlippingStart("right")
          //  setTimeout(()=>
          //  {
          //   this.leftPage+=2;
          //   this.rightPage+=2
          //  },1000)
        }    
        break;
      case "left":

        if(this.rightPage<=0)
        {
          this.closeBook();
          //this.overlapAnimation(overlaped,"closeBook")
         // this.resetPages();
        }
        else
        {
          this.overlapAnimation(overlaped,"left"); 
          this.onFlippingStart("left");          
          // setTimeout(()=>
          // {
          //   this.leftPage-=2;
          //   this.rightPage-=2;
          // },1000)

        }
       
        break;
      case "open":
        this.openBook();
        break;
    }


  }
  overlapAnimation(elem:HTMLElement,direction:string)
  {
    console.log(direction);

    switch(direction)
    {
      case "right":
       elem.classList.add("overlapRight");
       elem.classList.add("inFront");
       this.KillAnimation(elem,"overlapRight",1500)
       break;
      case "left":
        elem.classList.add("overlapLeft");
        elem.classList.add("inFront")
        this.KillAnimation(elem,"overlapLeft",1500)
        break;
      case "close":
        elem.classList.add("closeBook");
        this.KillAnimation(elem,"closeBook",2000)
        break;
      case "open":
        elem.classList.add("openBook");
        this.KillAnimation(elem,"openBook",3000)
        break;
             
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
          this.rightPage+=2;
          break;
        case "overlapLeft":
          this.leftPage-=2;
          break;  
      }

    },mellySeconds)
     
  }
  resetPages()
  {
    this.leftPage=-1;
    this.rightPage=-1
  }

  onFlippingStart(direction:string)
  {
    let page;
    let flipper;
    switch(direction)
    {
      case "right":
        page=document.querySelector(".leftPage");
        flipper=document.querySelector(".leftFlipper");
        console.log(page);
        console.log(flipper);
        this.moveContent(page,flipper)
        console.log(this.leftPage)
        this.leftPage+=2;
        break;
      case "left":
        page=document.querySelector(".rightPage");
        flipper=document.querySelector(".rightFlipper");
        this.moveContent(page,flipper);
        this.rightPage-=2;
        
    }

  }



  moveContent(source:Element | null,destination:Element |null)
  {
    if(source!=null && destination !=null)
    destination.innerHTML=source.innerHTML;

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
      this.rightPage=0;
      this.leftPage=1;
      setTimeout(()=>
      {
        this.openBookAnimation=false;
      },1500)

    },500)

  }


  closeBook()
  {
    let leftSide=document.querySelector(".left");
    let rightSide=document.querySelector(".right");
    let bookSlider=document.querySelector(".bookSlider");
    let bookContent=document.querySelector(".bookContent");
    bookSlider?.classList.add("hide");
    leftSide?.classList.add("rotate90");
    rightSide?.classList.add("rotateMinus90");
    setTimeout(()=>
    {
      this.resetPages();
    },1000)

  }
  
}
