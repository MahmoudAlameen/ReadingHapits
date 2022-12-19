import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";
@Directive({
    selector: '[validName]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValidNameValidator, multi: true}]
  })
  export class ValidNameValidator implements Validator
  {

    validate(control: AbstractControl): ValidationErrors | null {
        console.log("ima running");
        if(control == null)
         return null;
        let value=control.value;
        for(let i=0; i<value.length;  i++)
        {
            let code=value.charCodeAt(i);
            console.log(code);
            if(!((code>=65 && code<=90)|| (code>=97 && code<=122) || (code>=1569 && code<=1610) || code==32))
                      return {er:"name must be characters only"};
            


        }
        return null;
        
    }

  }

  export function CharacterOnly(value:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        for(let i=0; i<value.length;  i++)
        {
            let code=value.charCodeAt(i);
            if(!((code>=65 && code<=90)|| (code>=97 && code<=122)))
                      return {'error':"name must be characters only"};
            


        }
      return null;
    };
  }