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
  constructor(private registerFormData:RegisterFormDataService, private UserService:UserService , private router :Router,
    private SessionKeys:SessionStorageKeysService, private SessionStorage: SessionStorageService,
    private customAlert:CustomAlertService) { }

  ngOnInit(): void {
    this.alertMessage.isDisplayed = true;
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
         this.SessionStorage.setItem(this.SessionKeys.userId,response.model?.userId as string);
         this.SessionStorage.setItem( this.SessionKeys.userName, this.logedUser.email);
         this.SessionStorage.setItem(this.SessionKeys.name , response.model?.name as string);
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
}
