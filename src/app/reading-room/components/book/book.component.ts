import { animation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/classes/Book';

@Component({
  
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
@Input() bookId!:number;
book:Book=new Book();
bookPages:string[]=["5487 حدثنا محمد بن بشار حدثنا عبد الوهاب أخبرنا أيوب عن عكرمة أن رفاعة طلق امرأته فتزوجها عبد الرحمن بن الزبير القرظي قالت عائشة وعليها خمار أخضر فشكت إليها وأرتها خضرة بجلدها فلما جاء رسول الله صلى الله عليه وسلم والنساء ينصر بعضهن بعضا قالت عائشة ما رأيت مثل ما يلقى المؤمنات لجلدها أشد خضرة من ثوبها قال وسمع أنها قد أتت رسول الله صلى الله عليه ","م5487 حدثنا محمد بن بشار حدثنا عبد الوهاب أخبرنا أيوب عن عكرمة أن رفاعة طلق امرأته فتزوجها عبد الرحمن بن الزبير القرظي قالت عائشة وعليها خمار أخضر فشكت إليها وأرتها خضرة بجلدها فلما جاء رسول الله صلى الله عليه وسلم والنساء ينصر بعضهن بع","لم يقع خلاف بين العلماء أن الاسم الكامل للكتاب هو «الجامع المسند الصحيح المختصر من أُمور رسول الله صلى الله عه وسلّم وسننه وأيامه» وأن هذا الاسم هو ما سمّاه به البخاريّ نفسه. ذكر ذلك عدد من العلماء ومنهم ابن خير الإشبيلي وابن الصلاح والقاضي عياض والنووي وابن الملقن وغيرهم. وكان البخاري يذكر الكتاب أحياناً باختصار فيسمّيه: «الصحيح» أو «الجامع الصحيح» وسمّاه بذلك عدد من العلماء منهم ابن الأثير وابن نقطة والحاكم النيسابوري والصفدي والذهبي وابن ماكولا وأبو الوليد الباجي وغيرهم. وقد عُرف الكتاب قديماً وحديثاً على ألسنة الناس والعلماء بِاْسم «صحيح البخاري» وأصبح هذا الاختصار معهوداً معزواً إلى الإمام البخاري للشهرة الواسعة للكتاب ومصنّفه.","وسلم فجاء ومعه ابنان له من غيرها قالت والله ما لي إليه من ذنب إلا أن ما معه ليس بأغنى عني من هذه وأخذت هدبة من ثوبها فقال كذبت والله يا رسول الله إني لأنفضها نفض الأديم ولكنها ناشز تريد رفاعة فقال رسول الله صلى الله عليه وسلم فإن كان ذلك لم تحلي له أو لم تصلحي له حتى يذوق من عسيلتك قال وأبصر معه ابنين له فقال بنوك هؤلاء قال نعم قال هذا الذي تزعمين ما تزعمين","هو أبو عبد الله محمد بن إسماعيل بن إبراهيم بن المغيرة بن بَرْدِزبَه(2) الجعفي البخاري. من أهم علماء الحديث وعلوم الرجال والجرح والتعديل والعلل عند أهل السنة والجماعة، وأحد كبار الحفّاظ(3) الفقهاء ولد في بخارى ليلة الجمعة الثالث عشر من شوال سنة 194 هـ، الموافق 20 يوليو 810 م. وتربّى في بيت علم حيث كان أبوه من العلماء المحدّثين الراحلين في طلب الحديث، وتوفّي والإمام البخاري صغير فنشأ البخاري يتيماً في حجر أمه،"];
displayedPage:number=0
  constructor() { }

  ngOnInit(): void {

    this.book.cover="./assets/images/cover.jpg"
  }
  overlapPage(direction:string, overlaped:HTMLElement)
  {
    switch(direction)
    {
      case "right":
        if(this.displayedPage>=this.bookPages.length-1)
        {
          this.overlapAnimation(overlaped,"closeBook");
          setTimeout(()=>{this.displayedPage=-1;},1000)
        }
        else
        {
          this.overlapAnimation(overlaped,"right");
          //this.displayedPage+=2
           setTimeout(()=>this.displayedPage+=2,1000)
        }    
        break;
      case "left":
        this.overlapAnimation(overlaped,"left"); 
        setTimeout(()=>this.displayedPage-=2,1000)
        break;
      case "cover":
        this.overlapAnimation(overlaped,"openCover")
        setTimeout(() =>this.displayedPage=0,1000);
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
       this.KillAnimation(elem,"overlapRight",1900)
       break;
      case "left":
        elem.classList.add("overlapLeft");
        this.KillAnimation(elem,"overlapLeft",1900)
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

  KillAnimation(elem:HTMLElement, animation:string,MellySeconds:number)
  {
    setTimeout(()=>
    {
      elem.classList.remove(animation);


    },MellySeconds)

  }

}
