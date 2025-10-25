import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {  SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { UserService } from 'src/app/core/User.Service';
import { TranslateService } from '@ngx-translate/core'; 
import { Observable, Subscription } from 'rxjs';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { AuthService } from 'src/app/core/auth.service';
import { IUserClaims } from 'src/app/enums/users.enums';
import { IUserData } from 'src/app/DTOs/user-data.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<IUserClaims | null>;
  userData$ : Observable<IUserData | null>;
  userEmail: string | null = null;
  constructor(
    public translate: TranslateService,
     private userService: UserService,
     private router: Router,
     private customAlert: CustomAlertService,
    private authService: AuthService)
  {
    this.currentUser$ = this.authService.currentUser$;
    this.userData$ = this.userService.UserData$;

  }

  alertMessage: AlertMessage = new AlertMessage();
  private translateSub?: Subscription;

  languageButtonText : string = "EN";
 // Flag to control the directionality
  isRtl: boolean = false; 
  // Mobile menu state
  isOpen: boolean = false; 
  
    readonly navConfig = [
    { key: 'home', link: 'home' },
    { key: 'learning materials', link: '#learning-subjects' },
    { key: 'assessments', link: 'assessments/list' },
    { key: 'about', link: 'about' },
  ];
  // Navigation items data with Arabic translations
  navItems = [
    { label: 'Home', link: 'home'},
    { label: 'learning materials', link: '#learning-subjects' },
    { label: 'assessments', link: 'assessments' },
    { label: 'About Us', link: 'about' },
  ];

  ngOnInit() {
    this.userService.setUserData();

    this.languageButtonText = this.translate.currentLang === 'ar' ? 'EN' : 'AR';
    // Set up a listener for window resize to close the menu on desktop
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize.bind(this));
    }

     this.translateSub = this.translate
      .stream('nav')
      .subscribe(navTranslations => {
        this.navItems = this.navConfig.map(item => ({
          ...item,
          label: navTranslations[item.key]
        }));
      });
  }

  // A trackBy function is necessary when using *ngFor for better performance (A14 practice)
  trackByLink(index: number, item: { label: string; link: string;}): string {
    return item.link;
  }

  // Toggles the mobile menu state
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
  


  switchLanguage(langText: string) {
  const lang = langText === 'AR' ? 'ar' : 'en';
 this.translate.use(lang);
   //  this.isRtl = lang === 'ar';

 // Handle LTR/RTL
 console.log("switch language hitted")

 const htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;

 htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
 this.languageButtonText = lang === 'ar' ? 'EN' : 'AR';
 console.log(this.translate.currentLang)

 }




  // Automatically closes the mobile menu if the screen size exceeds the desktop breakpoint (768px)
  onResize(): void {
    if (window.innerWidth >= 768 && this.isOpen) {
      this.isOpen = false;
    }
  }

 logout()
 {
  
  this.authService.LogoutUser().subscribe(
  response=>
    {
      if(response.isValid && response.model)
        {
          this.userService.userDataSubject.next(null);

          this.router.navigate(['login']); 
        }
      else
      {
        this.alertMessage.message = response.errorMessage;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    },
    err=> 
    {
        this.alertMessage.message = err;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
    }
)}

}

