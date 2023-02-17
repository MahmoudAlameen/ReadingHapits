import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/classes/student';
import { RegisterFormDataService } from 'src/app/core/register-form-data.service';
import { logedUser } from 'src/interfaces/logedUser';
import { ValidNameValidator } from 'src/app/customDirectives/CharactersOnly';
import { UserService } from 'src/app/core/User.Service';
import { Gender } from 'src/app/enums/gender';
import { Router } from '@angular/router';
import { SessionStorageKeysService } from 'src/app/core/SessionStorageKeysService';
import { SessionStorageService } from 'src/app/core/SessionStorageService';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { CustomAlertService } from 'src/app/core/custom-alert.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {

  logedUser:logedUser={email:"",password:""};
  registeredUser:Student=new Student();
  register:boolean=false;
  schools:string[]=["dssd","dsdsdsd","sdsdsdsd"];
  countries:string[]=[];
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
  constructor(private registerFormData:RegisterFormDataService, private UserService:UserService , private router :Router,
    private SessionKeys:SessionStorageKeysService, private SessionStorage: SessionStorageService,
    private customAlert:CustomAlertService) { }

  ngOnInit(): void {
    this.getSchools();
    this.getCountries();
    this.alertMessage.isDisplayed = true;
  }
  postData()
  {

  }
  openRegisterForm()
  {
    console.log(this.register)
    if(this.register)
    this.register=false;
    else
    this.register=true
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
    this.UserService.AddUser(this.registeredUser).subscribe(
      response=>
      {
        if(response.isValid==true)
        {
          this.alertMessage.message = "تم تسجيل الحساب بنجاح";
          this.customAlert.alert.next(this.alertMessage);
          this.userId=response.UserId
          let email= this.registeredUser.email;
          let password = this.registeredUser.password;
          this.clearRegisteForm();
          this.register=false;
          this.logedUser.email=email;
          this.logedUser.password = password;
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
  loginUser()
  {
    this.UserService.LoginUser(this.logedUser).subscribe(
      response=>
      {
        if(!response.isValid)
        {
          this.alertMessage.message = " كلمه السر او الباسورد غير صحيح ";
          this.customAlert.alert.next(this.alertMessage);
        }
        if(response.isValid)
        {
         this.SessionStorage.setItem(this.SessionKeys.userId,response.model);
         this.SessionStorage.setItem( this.SessionKeys.userName,this.logedUser.email);
          this.router.navigate(['']).then(()=> window.location.reload());
          console.log("hey iam there in home page ... ");
        // this.router.navigateByUrl('home').then(()=>window.location.reload())
        }
      },
      err=>
      {
        this.alertMessage.message =  err;
        this.customAlert.alert.next(this.alertMessage);
      }
    )

  }
  clearRegisteForm()
  {
    this.registeredUser= new Student();
  }

}
