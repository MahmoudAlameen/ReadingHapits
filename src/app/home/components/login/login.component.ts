import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterFormDataService } from 'src/app/core/register-form-data.service';
import { logedUser } from 'src/interfaces/logedUser';
import { UserService } from 'src/app/core/User.Service';
import { Router } from '@angular/router';
import { SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { Role } from 'src/app/enums/Role';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logedUser:logedUser={email:"",password:"", role: Role.Student};
  userId  :string="";
  alertMessage:AlertMessage = new AlertMessage();
  @ViewChild(HeaderComponent) headerComponent! :HeaderComponent
  errorMessages=
  {
    all: " ادخل كل البيانات المطلوبه بشكل صحيح ثم اضغط على تسجيل الدخول",
    name:"يجب ان يكون الاسم من 3 الى 50 حرف ",
    email: "الايميل غير صحيح",
    age : "يجب ان يكون العمر من 5  الى 100",
    governate: " اسم المحافظه  يجب ان يكون من 3 الى 50 حرف ",
    school: "اسم المدرسه غير صحيح",
    password: ",على الاقل جرف كابيتال و على لاقل حرف صغير و على لاقل رقم واحد يجب ان يحتوى الباسورد على ثمانيه حروف , حروف من اللغه الانجليزيه فقط حرف  "
  }
  constructor(
      private registerFormData:RegisterFormDataService,
      private UserService:UserService ,
      private router :Router,
      private customAlert:CustomAlertService,
      private translateService : TranslateService,
      private authService: AuthService) { }

  ngOnInit(): void {
    this.alertMessage.isDisplayed = true;
  }
  
  loginUser()
  {
    console.log("login starting ...")
    var loginError: string  = '';
    this.authService.LoginUser(this.logedUser).subscribe(
      response=>
      {
        if(!response.isValid)
        {
          this.alertMessage.message = response.errorMessage;
          this.customAlert.alert.next(this.alertMessage);
        }
        if(response.isValid)
        {
         this.router.navigate(['']).then(()=> window.location.reload());
          console.log("hey iam there in home page ... ");
        // this.router.navigateByUrl('home').then(()=>window.location.reload())
        }
      },
      err=>
      {
        
        // Backend returns Unauthorized(401) on invalid credentials
        if ( err && err.status === 401) {
          // The backend message: "Email or Password is invalid" is directly in the error body
          loginError = this.translateService.currentLang == 'ar' ? "كلمه السر او الباسورد غير صحيحه" :  err.error || 'Invalid email or password.';
        } else if ( err && err.status === 400) {
          // Handle specific bad request errors if necessary
          loginError =  this.translateService.currentLang == 'ar' ? "خطا فى ارسال البيانات" :'Bad Request. Check your input.';
        } else {
          loginError = `An unexpected error occurred. Please try again later. ${err}`;
        }
        this.alertMessage.message =  loginError;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }
}
