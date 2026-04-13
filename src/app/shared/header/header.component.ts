import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {  SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { UserService } from 'src/app/core/User.Service';
import { TranslateService } from '@ngx-translate/core'; 
import { map, Observable, Subscription } from 'rxjs';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { AuthService } from 'src/app/core/auth.service';
import { IUserClaims } from 'src/app/enums/users.enums';
import { IUserData } from 'src/app/DTOs/user-data.interface';
import { Role } from 'src/app/enums/Role';
import { APIService } from 'src/app/core/API.Service';
import { debug } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<IUserClaims | null>;
  userData$ : Observable<IUserData | null>;
  userEmail: string | null = null;
  canAccessDashboard$: Observable<boolean> = new Observable<boolean>();
  constructor(
    public translate: TranslateService,
     private userService: UserService,
     private router: Router,
     private customAlert: CustomAlertService,
     private authService: AuthService,
     private sessionStorageService: SessionStorageService,
     private sessionStorageKeys: SessionStorageKeysService,
     private API: APIService
   )
  {
    this.currentUser$ = this.authService.currentUser$;
    this.userData$ = this.userService.UserData$;

    // Logic to check if user has required roles
this.canAccessDashboard$ = this.currentUser$.pipe(
  map(user => {
    debugger;
    if (!user || !user.roles) return false;

    // 1. If the user is an Admin, they always have access
    const isAdmin = user.roles.includes(Role[Role.Admin]);
    if (isAdmin) return true;

    // 2. Check if the user is a Teacher or SchoolPrincipal
    const hasStaffRole = user.roles.includes(Role[Role.Teacher]) || 
                         user.roles.includes(Role[Role.SchoolPrincipal]);

    // 3. If they are staff, they MUST also be activated as a member
    if (hasStaffRole) {
      return user.isAccountActivatedAsMember === true;
    }

    // 4. Default fallback (e.g., for Students or guests)
    return false;
  })
);

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
    { key: 'Excercises', link: 'learning-materials' },
    { key: 'assessments', link: 'assessments' },
    { key: 'about', link: 'about' },
  ];
  // Navigation items data with Arabic translations
  navItems = [
    { label: 'Home', link: 'home'},
    { label: 'Excercises', link: 'learning-materials' },
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

 const htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;

 htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
 this.languageButtonText = lang === 'ar' ? 'EN' : 'AR';

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

// Method to handle external redirection
  navigateToDashboard() {
    const token = this.sessionStorageService.getValue(this.sessionStorageKeys.jwt_token); // Or wherever you store your Bearer token
    const dashboardUrl = this.API.dashboardUrl; // The URL of the external dashboard you want to redirect to
    
    if (token) {
      // Redirect with token as a query parameter
      window.location.href = `${dashboardUrl}authentication?access_token=${token}`;
    } else {
      // Fallback if no token found
      this.router.navigate(['/login']);
    }
  }

}

