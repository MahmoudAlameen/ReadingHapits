import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
// Footer data can be stored here to make the template cleaner
currentYear: number;

quickLinks = [
    { label: 'About Us', url: '#about' },
    { label: 'Courses', url: '#courses' },
    { label: 'FAQs', url: '#faqs' },
    { label: 'Contact', url: '#contact' }
  ];

  legalLinks = [
    { label: 'Privacy Policy', url: '#privacy' },
    { label: 'Terms of Service', url: '#terms' }
  ];

  socialLinks = [
    { icon: '🌐', label: 'Visit our website', url: '#website' },
    { icon: '🐦', label: 'Follow us on Twitter', url: '#twitter' },
    { icon: '🔗', label: 'Connect with us on LinkedIn', url: '#linkedin' },
    { icon: '▶️', label: 'Subscribe to our YouTube channel', url: '#youtube' }
  ];

  constructor(private translate: TranslateService) {
    // Get the current year from the Date object and assign it to the property.
    this.currentYear = new Date().getFullYear();

   }
  ngOnInit(): void {
     this.localizeLabels();
  }

 private localizeLabels(): void {
    const keys = [
      ...this.quickLinks.map(l => l.label),
      ...this.legalLinks.map(l => l.label),
      ...this.socialLinks.map(l => l.label)
    ];

    // Use stream instead of get
    this.translate.stream(keys).subscribe(translations => {
      this.quickLinks = this.quickLinks.map(link => ({
        url : link.url,
        label: translations[link.label] || link.label
      }));

      console.log(...this.quickLinks)
      this.legalLinks = this.legalLinks.map(link => ({
        url : link.url,
        label: translations[link.label] || link.label
      }));

      this.socialLinks = this.socialLinks.map(link => ({
        url : link.url,
        icon: link.icon,
        label: translations[link.label] || link.label
      }));
    });
  }

  /**
   * Handles the newsletter subscription form submission.
   * In a real application, you would send this data to a backend.
   * @param event The form submission event.
   */
  onSubscribe(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    console.log('Subscribed with email:', emailInput.value);
    // Here you would typically call a service to handle the subscription
  }

}
