import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/classes/student';
import { RegisterFormDataService } from 'src/app/core/register-form-data.service';
import { logedUser } from 'src/interfaces/logedUser';
import { CharactersOnlyValidator } from 'src/app/customDirectives/CharactersOnly';
import { UserService } from 'src/app/core/User.Service';
import { Gender } from 'src/app/enums/gender';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {

  logedUser:logedUser={userName:"",password:""};
  registeredUser:Student=new Student();
  register:boolean=false;
  schools:string[]=["dssd","dsdsdsd","sdsdsdsd"];
  countries:string[]=[];
  userId  :string=""
  errorMessages=
  {
    all: " اخل كل البيانات المطلوبه بشكل صحيح ثم اضغط على تسجيل الدخول",
    name:"يجب ان يكون الاسم من 3 الى 50 حرف ",
    email: "الايميل غير صحيح",
    age : "يجب ان يكون العمر من 5  الى 100",
    governate: " اسم المحافظه  يجب ان يكون من 3 الى 50 حرف ",
    school: "اسم المدرسه غير صحيح"

  }
  constructor(private registerFormData:RegisterFormDataService, private UserService:UserService) { }

  ngOnInit(): void {
    this.getSchools();
    this.getCountries();
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
      err=>alert(err)
    )
  }
  getCountries()
  {
    this.registerFormData.getCountries().subscribe(
      countries=>this.countries=countries,
      err=>alert(err)
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

  createAccount()
  {
    this.registeredUser.gender=Gender.male
    this.UserService.AddUser(this.registeredUser).subscribe(
      response=>
      {
        this.userId=response.UserId
        alert("account registered successfully");

      } ,
      err=> alert(err)
    )


  }

}
