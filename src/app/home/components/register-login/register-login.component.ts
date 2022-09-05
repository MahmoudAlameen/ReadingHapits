import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/classes/student';
import { RegisterFormDataService } from 'src/app/core/register-form-data.service';
import { logedUser } from 'src/interfaces/logedUser';

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
  constructor(private registerFormData:RegisterFormDataService) { }

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
  validateSchool(school:string)
  {
    if(school="school")
    this.schoolHasError=false;
    else
    this.schoolHasError=true;
  }
  countryHasError:boolean=false;
  validateCountry(country:string)
  {
    if(country=="country")
     this.countryHasError=false;
    else
     this.countryHasError=true; 
  }

  registerStudent()
  {
    return;
  }

}
