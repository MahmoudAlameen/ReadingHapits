import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-global-assessments-vedio',
  templateUrl: './global-assessments-vedio.component.html',
  styleUrls: ['./global-assessments-vedio.component.scss']
})
export class GlobalAssessmentsVedioComponent implements OnInit {

  // No longer needed with the updated method signature
  // @ViewChild('mainVideo') videoElement!: ElementRef<HTMLVideoElement>;
  // @ViewChild('playButton') playButtonElement!: ElementRef<HTMLButtonElement>;
  // @ViewChild('videoThumbnail') thumbnailElement!: ElementRef<HTMLImageElement>;

  videoUrMp4: string = "https://www.w3schools.com/html/mov_bbb.mp4";
  videoUrlOgg: string = "https://www.w3schools.com/html/mov_bbb.ogg";
  thumbnailUrl: string = 'https://c.animaapp.com/RVEF9qVk/img/vedio-section-vedio.png';

  constructor() { }

  ngOnInit(): void { }

  // Corrected method to accept the parameters passed from the HTML
  playVideo(video: HTMLVideoElement, button: HTMLElement, thumbnail: HTMLElement): void {
    thumbnail.style.display = 'none';
    button.style.display = 'none';
    video.style.display = 'block';
    video.play();

    video.addEventListener('ended', () => {
      thumbnail.style.display = 'block';
      button.style.display = 'flex';
      video.style.display = 'none';
    });
  }
}