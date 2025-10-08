import { Component, OnInit } from '@angular/core';
interface TranslateServiceMock {
  get(key: string): { subscribe(callback: (value: string) => void): void };
}
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
/*
   providers: [
    { 
      provide: 'TranslateService', 
      useValue: {
        get: (key: string) => ({
          subscribe: (callback: (value: string) => void) => {
            const translations: Record<string, string> = {
              'ABOUT_US.TITLE': 'About Our E-Learning Platform',
              'ABOUT_US.SLOGAN': 'Learning, Simplified. Success, Amplified.',
              'ABOUT_US.MISSION_TITLE': 'Our Mission: Friendly & Seamless Education',
              'ABOUT_US.MISSION_CONTENT': 'To make quality education accessible, engaging, and fun. We are committed to simplifying the complex process of learning, ensuring every student has a friendly, low-stress environment to thrive and excel in their subjects and assessments.',
              'ABOUT_US.VISION_TITLE': 'Our Vision: The Future of Personalized Learning',
              'ABOUT_US.VISION_CONTENT': 'To be the leading global e-learning platform, recognized for innovation in international assessments and for generating powerful, actionable reports that drive student success, boost platform interaction, and foster continuous growth.',
              'ABOUT_US.WHY_US_TITLE': 'Why Choose Us? Experience Learning Reimagined',
              'ABOUT_US.FEATURE_1_TITLE': 'Comprehensive E-Learning Materials',
              'ABOUT_US.FEATURE_1_CONTENT': 'Access a vast, curated library of study subjects and high-quality e-learning materials designed for easy comprehension and effective study.',
              'ABOUT_US.FEATURE_2_TITLE': 'International Assessment Readiness',
              'ABOUT_US.FEATURE_2_CONTENT': 'Prepare for global exams with our integrated international assessments and dynamic testing environment. Easily view and take published exams.',
              'ABOUT_US.FEATURE_3_TITLE': 'Fun, Friendly, and Seamless Experience',
              'ABOUT_US.FEATURE_3_CONTENT': 'Our platform is built around you—providing a smooth, intuitive, and fun user interface that makes studying a joy, not a chore.',
              'ABOUT_US.FEATURE_4_TITLE': 'Actionable Performance Reports',
              'ABOUT_US.FEATURE_4_CONTENT': 'Receive in-depth, graphical reports about your platform interactions and exam performance, giving you the precise insights needed to focus your studies and maximize your potential.',
              'ABOUT_US.CALL_TO_ACTION': 'Ready to start your friendly learning journey? Register today and explore a world of seamless education.'
            };
            callback(translations[key] || key);
          }
        })
      }
    }
  ]
    */

}
