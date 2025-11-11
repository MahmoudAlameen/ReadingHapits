import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { finalize, Subscription } from 'rxjs';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { Student } from 'src/app/classes/student';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { RegisterFormDataService } from 'src/app/core/register-form-data.service';
import { UserService } from 'src/app/core/User.Service';
import { Role } from 'src/app/enums/Role';
import { NgForm } from '@angular/forms'; // ADDED for type safety
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { IIdWithName } from 'src/app/DTOs/shared.interfaces';
import { ContentService } from 'src/app/core/content.service';
import { FileType } from 'src/app/enums/Ffile-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private translationSub?: Subscription;

  avatarImageFile: File | null = null; // Holds the new file object
  imagePreviewUrl: string | ArrayBuffer | null = null; // Base64 or full absolute URL for display
  imageUploadError: string | null = null;
  
  private readonly allowedImageTypes = ['image/jpeg', 'image/png'];

  isSubmitting = false;
  isLoading = false;
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
  grades: IIdWithName[] = [];

  // Inject Router if needed for navigation after successful login
  constructor(private registerFormData: RegisterFormDataService,
    private UserService: UserService,
    private customAlert: CustomAlertService,
    private translateService: TranslateService,
    private router: Router, // Added Router for post-registration flow
    private learningSubjectService: LearningSubjectService ,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.getSchools();
    this.getCountries();
    this.getGrades();
    this.alertMessage.isDisplayed = true;
    this.translationSub = this.translateService
      .stream('errorMessages')
      .subscribe(messages => {
        this.errorMessages = messages;
      });

      this.translateService.onLangChange.subscribe(e =>
      {
        this.getCountries()
      }
      )
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
    this.registerFormData.getCountries(this.translateService.currentLang).subscribe(
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
    this.isSubmitting = true;
    if(this.avatarImageFile)
    {
      this.handleFileUploadAndSubmission();
    }
    else
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
          this.isSubmitting = false;
          
          // Consider navigating to the login page after successful registration
          this.router.navigate(['/login']); 
        } else {
          this.alertMessage.message = response.errorMessage;
          this.customAlert.alert.next(this.alertMessage);
          this.isSubmitting = false;
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
        this.isSubmitting = false;
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


  
 getGrades() {
 this.learningSubjectService.getGradesIdsWIthNames().subscribe(
 res => {
 if (res.isValid && res.modelList != null) {
 this.grades = res.modelList;
 } else {
 this.alertMessage.message = res.errorMessage;
 this.alertMessage.isDisplayed = true;
 this.customAlert.alert.next(this.alertMessage);
 }
 },
 err => {
 this.alertMessage.message = err;
 this.alertMessage.isDisplayed = true;
 this.customAlert.alert.next(this.alertMessage);
});}

  onFileSelected(event: Event): void {
    this.avatarImageFile = null;
    this.imageUploadError = null;
    
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files && files.length > 0) {
      const file = files[0];

      // Acceptance Criteria: Invalid file type validation
      if (!this.allowedImageTypes.includes(file.type)) {
        this.imageUploadError = 'ملف غير صالح. الأنواع المسموحة: jpg, png.';
        input.value = ''; 
        return;
      }

      this.avatarImageFile = file;

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreviewUrl = null;
    }
  }
    /**
   * Triggers the file input click from the custom button.
   */
  fireFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

    private handleFileUploadAndSubmission(): void {
    if (!this.avatarImageFile) return;

    this.contentService.uploadFile([this.avatarImageFile], FileType.UserProfileImage)
      .pipe()
      .subscribe({
        next: (res) => {
          if (res.isValid && res.modelList && res.modelList.length > 0) {
            const fileInfo = res.modelList[0];
            // Update CoverUrl with the new file information returned by the upload service
            this.registeredUser.avatarUrl = `${fileInfo.fileId}/${fileInfo.fileName}`;
            
            // Proceed to submit the Learning Subject data
            this.createAccount();
          } else {
            this.alertMessage.message = res.errorMessage || 'فشل في تحميل الصورة.';
            this.alertMessage.isDisplayed = true;
            this.customAlert.alert.next(this.alertMessage);
            this.isSubmitting = false;
          }
        },
        error: (err) => {
          this.alertMessage.message = 'خطأ في الاتصال بالخادم أثناء تحميل الصورة.';
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage);
          this.isSubmitting = false;
        }
      });
  }
}