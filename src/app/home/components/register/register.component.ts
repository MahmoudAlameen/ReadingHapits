import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { Student } from 'src/app/classes/student';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { RegisterFormDataService } from 'src/app/core/register-form-data.service';
import { SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { UserService } from 'src/app/core/User.Service';
import { Role } from 'src/app/enums/Role';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private translationSub?: Subscription;

  registeredUser:Student=new Student();
  schools:string[]=["dssd","dsdsdsd","sdsdsdsd"];
  countries:string[]=[];
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
  constructor(private registerFormData:RegisterFormDataService, 
    private UserService:UserService , 
    private customAlert:CustomAlertService,
  private translateService : TranslateService) { }

  ngOnInit(): void {
    this.getSchools();
    this.getCountries();
    this.alertMessage.isDisplayed = true;
        this.translationSub = this.translateService
      .stream('errorMessages')
      .subscribe(messages => {
        this.errorMessages = messages;
      });
  }
  postData()
  {

  }
  getSchools()
  {
    this.registerFormData.getSchools().subscribe(
      schools=>this.schools=schools,
      err=>
      {
        this.alertMessage.message = `${err}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }
  getCountries()
  {
    this.registerFormData.getCountries().subscribe(
      countries=>this.countries=countries,
      err=>
      {
        this.alertMessage.message = `${err}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }

  schoolHasError:boolean=false;
  schoolValueManually:boolean=false;
  validateSchool(school:string)
  {
    if(school=="school")
    {
      this.schoolHasError=true;
      this.schoolValueManually=false;
    }
    else if(school == "enterManually")
    {
      this.schoolValueManually=true;
      this.schoolHasError=false;
      this.registeredUser.school=""
    }
      
    else
    {
      this.schoolValueManually=false;
      this.schoolHasError=false;
    }
    console.log(this.schoolValueManually);
  }
  countryHasError:boolean=false;
  validateCountry(country:string)
  {
    if(country=="country")
     this.countryHasError=true;
    else
     this.countryHasError=false; 
  }

  registerStudent()
  {
    return;
  }

  createAccount(submit : HTMLInputElement)
  {
    submit.disabled = true;
    this.registeredUser.role = Role.Student;
    this.UserService.AddUser(this.registeredUser).subscribe(
      response=>
      {
        if(response.isValid==true)
        {
          this.alertMessage.message = "تم تسجيل الحساب بنجاح";
          this.customAlert.alert.next(this.alertMessage);
          let email= this.registeredUser.email;
          let password = this.registeredUser.password;
          this.clearRegisteForm();
        }
        if(response.isValid==false)
        {
          this.alertMessage.message = response.errorMessage;
          this.customAlert.alert.next(this.alertMessage);
        }
        submit.disabled = false;  
      } ,
      err=> 
      {
        this.alertMessage.message = err; 
        this.customAlert.alert.next(this.alertMessage);
         submit.disabled = false;
      }
    )
  }
  clearRegisteForm()
  {
    this.registeredUser= new Student();
  }

}
