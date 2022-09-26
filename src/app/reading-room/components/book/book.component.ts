import { animation } from '@angular/animations';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Book } from 'src/app/classes/Book';

@Component({
  
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
@Input() bookId!:number;
book:Book=new Book();
bookPages:string[]=["5487 حدثنا محمد بن بشار حدثنا عبد الوهاب أخبرنا أيوب عن عكرمة أن رفاعة طلق امرأته فتزوجها عبد الرحمن بن الزبير القرظي قالت عائشة وعليها خمار أخضر فشكت إليها وأرتها خضرة بجلدها فلما جاء رسول الله صلى الله عليه وسلم والنساء ينصر بعضهن بعضا قالت عائشة ما رأيت مثل ما يلقى المؤمنات لجلدها أشد خضرة من ثوبها قال وسمع أنها قد أتت رسول الله صلى الله عليه ","م5487 حدثنا محمد بن بشار حدثنا عبد الوهاب أخبرنا أيوب عن عكرمة أن رفاعة طلق امرأته فتزوجها عبد الرحمن بن الزبير القرظي قالت عائشة وعليها خمار أخضر فشكت إليها وأرتها خضرة بجلدها فلما جاء رسول الله صلى الله عليه وسلم والنساء ينصر بعضهن بع","لم يقع خلاف بين العلماء أن الاسم الكامل للكتاب هو «الجامع المسند الصحيح المختصر من أُمور رسول الله صلى الله عه وسلّم وسننه وأيامه» وأن هذا الاسم هو ما سمّاه به البخاريّ نفسه. ذكر ذلك عدد من العلماء ومنهم ابن خير الإشبيلي وابن الصلاح والقاضي عياض والنووي وابن الملقن وغيرهم. وكان البخاري يذكر الكتاب أحياناً باختصار فيسمّيه: «الصحيح» أو «الجامع الصحيح» وسمّاه بذلك عدد من العلماء منهم ابن الأثير وابن نقطة والحاكم النيسابوري والصفدي والذهبي وابن ماكولا وأبو الوليد الباجي وغيرهم. وقد عُرف الكتاب قديماً وحديثاً على ألسنة الناس والعلماء بِاْسم «صحيح البخاري» وأصبح هذا الاختصار معهوداً معزواً إلى الإمام البخاري للشهرة الواسعة للكتاب ومصنّفه.","وسلم فجاء ومعه ابنان له من غيرها قالت والله ما لي إليه من ذنب إلا أن ما معه ليس بأغنى عني من هذه وأخذت هدبة من ثوبها فقال كذبت والله يا رسول الله إني لأنفضها نفض الأديم ولكنها ناشز تريد رفاعة فقال رسول الله صلى الله عليه وسلم فإن كان ذلك لم تحلي له أو لم تصلحي له حتى يذوق من عسيلتك قال وأبصر معه ابنين له فقال بنوك هؤلاء قال نعم قال هذا الذي تزعمين ما تزعمين","هو أبو عبد الله محمد بن إسماعيل بن إبراهيم بن المغيرة بن بَرْدِزبَه(2) الجعفي البخاري. من أهم علماء الحديث وعلوم الرجال والجرح والتعديل والعلل عند أهل السنة والجماعة، وأحد كبار الحفّاظ(3) الفقهاء ولد في بخارى ليلة الجمعة الثالث عشر من شوال سنة 194 هـ، الموافق 20 يوليو 810 م. وتربّى في بيت علم حيث كان أبوه من العلماء المحدّثين الراحلين في طلب الحديث، وتوفّي والإمام البخاري صغير فنشأ البخاري يتيماً في حجر أمه،","قطعة إنشائية، ذات طول معتدل تُكتب نثراً، وتُهتمُّ بالمظاهر الخارجية للموضوع بطريقة سهلةٍ سريعة، ولا تعنى إلا بالناحية التي تمسُّ الكاتب عن قرب. رأى النور في عصر النهضة الأوروبية، واتخذ مفهومه من محاولات التي أطلق عليها اسم Essais،الفصل (صيد الخاطر) كما عرفه العرب أقدم رائد للمقالة في الآداب العالمية، ذلك أن الفصل في الأدب العربي قد ظهر قبل ظهور مقالات مونتاني إمام هذا الفن غير مدافع بين الأوروبيين، فقد ظهر فن المقالة لأول مرة في فرنسا سنة 1571م، ثم ظهر بعد ذلك ببضع عشرة سنة في كتابات فرانسيس بيكون، ثم أصبحت المقالة منذ ذلك الحين فناً","إن هذا الكتاب حسن الطوية فهو ينبهك منذ البداية إني لا أستهدف من ورائه مقصداً إلا ما ينفع العام والخاص، ولم أرد به خدمتك أو إعلاء ذكرى فإن مواهبي تعجز عن تحقيق مثل هذه الغاية... لقد خصصته لمنفعة الخاصة من أهلي وأصدقائي حتى إذا ما افتقدوني استطاعوا أن يجدوا فيه صورة لطباعي وميولي، فيسترجعوا ذكراي التي خلفتها لهم حيّة كاملة ولو كان هدفي أن أظفر بإعجاب العالم لعملت على إطراء نفسي وإظهارها بطريقة منمّقة ولكني أريد أن أعرف في أبسط صوري الطبيعية العادية دون تكلف ولا تصنع لأني أنا الذي أصوّر نفسي لهذا تبرز مساوئي واضحة وسجيتي على طبيعتها ما سمح لي العرف بذلك."," لَمّا كانت الخواطر تجول في تصفح أشياء تعرض لها، ثم تعرض عنها فتذهب، كان من أولى الأمور حفظ ما يخطر لكي لا ينسى، وقد قال عليه الصلاة والسلام:قيِّدوا العلم بالكتابة. وكم خطر لي شيء فأتشاغل عن إثباته فيذهب، فأتأسف عليه ورأيت في نفسي إنني كلما فتحت بصر التفكر، سنح له من عجائب الغيب ما لم يكن في حساب فانثال عليه من كثيب التفهيم ما لا يجوز التفريط فيه فجعلت هذا الكتاب قيداً –لصيد الخاطر- والله وليّ النفع، إنه قريب مجيب","النهايه"];
//displayedPage:number=0
leftPage:number=-1;
rightPage:number=-1;
rightFlipper!:HTMLElement |null
leftFlipper!:HTMLElement  |null
openBookAnimation:boolean=false;

constructor() { }

  ngOnInit(): void {

    this.book.cover="./assets/images/cover.jpg";
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
        if(this.leftPage>this.bookPages.length-1)
        {
          this.closeBook();
          //this.overlapAnimation(overlaped,"closeBook");
         // setTimeout(()=>{this.resetPages();},1000)
        }
        else
        {
          this.overlapAnimation(overlaped,"right");
          this.onFilppingStart("right")
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
          this.onFilppingStart("left");          
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

  onFilppingStart(direction:string)
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
