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
import { NgForm } from '@angular/forms'; // ADDED for type safety

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private translationSub?: Subscription;

  registeredUser: Student = new Student();
  schools: string[] = ["dssd", "dsdsdsd", "sdsdsdsd"];
  countries: string[] = [];
  alertMessage: AlertMessage = new AlertMessage();

  // Added ViewChild for the form itself to access its properties if needed
  @ViewChild('registerForm') registerForm!: NgForm; 

  // FIX: Added 'phoneNumber' and corrected 'governate' to 'country' error message
  errorMessages =
  {
    all: "ادخل كل البيانات المطلوبه بشكل صحيح ثم اضغط على تسجيل الدخول",
    name: "يجب ان يكون الاسم من 3 الى 50 حرف ",
    email: "الايميل غير صحيح",
    age: "يجب ان يكون العمر من 5 الى 100",
    country: "اسم الدوله يجب ان يكون من 3 الى 50 حرف ", // FIX: Changed from governate
    school: "اسم المدرسه غير صحيح",
    phoneNumber: "يجب ان يكون رقم الهاتف من 10 الى 15 رقم.", // NEW
    password: ",على الاقل حرف كابيتال و على الاقل حرف صغير و على الاقل رقم واحد يجب ان يحتوى الباسورد على ثمانيه حروف , حروف من اللغه الانجليزيه فقط حرف "
  }

  // Inject Router if needed for navigation after successful login
  constructor(private registerFormData: RegisterFormDataService,
    private UserService: UserService,
    private customAlert: CustomAlertService,
    private translateService: TranslateService,
    private router: Router // Added Router for post-registration flow
    ) { }

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

  // FIX: Removed the unused postData() method

  getSchools() {
    this.registerFormData.getSchools().subscribe(
      schools => {
        this.schools = schools;
        // FIX: Ensure the default school value triggers the validation logic on load
        this.validateSchool(this.registeredUser.school);
      },
      err => {
        this.alertMessage.message = `${err}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }
  
  getCountries() {
    this.registerFormData.getCountries().subscribe(
      countries => {
        this.countries = countries;
        // FIX: Ensure the default country value triggers the validation logic on load
        this.validateCountry(this.registeredUser.country);
      },
      err => {
        this.alertMessage.message = `${err}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    )
  }

  schoolHasError: boolean = true; // FIX: Should default to true if the default option is selected
  schoolValueManually: boolean = false;
  validateSchool(school: string) {
    if (school === "" || school === "school") { // Updated logic to check for empty string/default value
      this.schoolHasError = true;
      this.schoolValueManually = false;
    }
    else if (school === "enterManually") {
      this.schoolValueManually = true;
      this.schoolHasError = false;
      this.registeredUser.school = ""; // Clear the model to force required validation on the new input
    }
    else {
      this.schoolValueManually = false;
      this.schoolHasError = false;
    }
  }
  
  countryHasError: boolean = true; // FIX: Should default to true if the default option is selected
  validateCountry(country: string) {
    if (country === "" || country === "country") // Updated logic to check for empty string/default value
      this.countryHasError = true;
    else
      this.countryHasError = false;
  }

  // FIX: This method is now correctly triggered by (ngSubmit) on the form tag
  registerStudent() {
    // Check if the form is truly valid based on template checks
    if (this.registerForm.form.invalid || this.countryHasError || this.schoolHasError) {
        // Form is invalid, display alert and do nothing
        this.alertMessage.message = this.errorMessages.all;
        this.customAlert.alert.next(this.alertMessage);
        return;
    }

    // Call the original account creation logic
    this.createAccount();
  }

  // FIX: Removed the 'submit' HTMLInputElement parameter. The button disabling logic
  // should be handled either with a component property or by the caller.
  createAccount() {
    // 1. Disable form submission (using form.disabled property to prevent double-click)
    // The [disabled] attribute on the button in the template is good enough for most cases.
    
    this.registeredUser.role = Role.Student;
    
    this.UserService.AddUser(this.registeredUser).subscribe(
      response => {
        if (response.isValid === true) {
          this.alertMessage.message = "تم تسجيل الحساب بنجاح";
          this.customAlert.alert.next(this.alertMessage);
          
          // Consider navigating to the login page after successful registration
          this.router.navigate(['/login']); 
        } else {
          this.alertMessage.message = response.errorMessage;
          this.customAlert.alert.next(this.alertMessage);
        }
      },
      err => {
        let errorMessage: string;

        if (err.status === 400) {
          console.log(err.error.errors);
          // FIX: Accessing error messages from the backend
          errorMessage = err.error.message || err.error.errors || this.errorMessages.all;
        } else {
          errorMessage = this.translateService.currentLang === "ar" ? 
                         `حدث خطا اثنا الوصول للسيرفر` : 
                         `Error occurred during accessing the server.`;
        }

        this.alertMessage.message = errorMessage;
        this.customAlert.alert.next(this.alertMessage);
      }
    );
  }
  
  clearRegisteForm() {
    // FIX: Using the form's reset method is better than reassigning the model
    this.registerForm.resetForm(new Student()); 
    this.registeredUser = new Student();
    this.schoolHasError = true;
    this.countryHasError = true;
    this.schoolValueManually = false;
  }
  
  ngOnDestroy(): void {
    if (this.translationSub) {
      this.translationSub.unsubscribe();
    }
  }
}