import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";
@Directive({
    selector: '[validPassword]',
    providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true}]
  })
  export class PasswordValidator implements Validator
  {
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        
        let value:string=control.value;
        let error=null;
        if(value?.length<8)
        error={lessthan8numbers:true}
        let reg=new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
        if(reg.test(value))
           return null;
        return error={notmatched:true}   


        
    }

  }