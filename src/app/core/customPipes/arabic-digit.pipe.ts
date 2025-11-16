import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localDigits',
  pure: false   // ensures it updates when language changes
})
export class LocalDigitsPipe implements PipeTransform {

  private arabicMap = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];

  constructor(private translate: TranslateService) {}

  transform(value: any): any {
    if (value == null) return value;

    const str = value.toString();

    // If current language is Arabic => convert to Arabic digits
    if (this.translate.currentLang === 'ar') {
      return str.replace(/\d/g, (d: string) => this.arabicMap[Number(d)]);
    }

    // Otherwise return English digits
    return str;
  }
}
