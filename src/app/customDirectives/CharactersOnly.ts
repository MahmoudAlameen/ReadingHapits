import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";
@Directive({
    selector: '[CharactersOnly]',
    providers: [{provide: NG_VALIDATORS, useExisting: CharactersOnlyValidator, multi: true}]
  })
  export class CharactersOnlyValidator implements Validator
  {

    validate(control: AbstractControl): ValidationErrors | null {
        console.log("ima running");
        if(control == null)
         return null;
        let value=control.value;
        for(let i=0; i<value.length;  i++)
        {
            let code=value.charCodeAt(i);
            if(!((code>=65 && code<=90)|| (code>=97 && code<=122)))
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