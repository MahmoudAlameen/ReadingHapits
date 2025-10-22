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

}
