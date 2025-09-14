import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() title!: string;
  @Input() progress!: number; // A number from 0 to 100
  @Input() text!: string;

  constructor() { }
}