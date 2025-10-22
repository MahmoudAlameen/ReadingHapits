import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/core/API.Service';

@Component({
  selector: 'app-global-assessments-vedio',
  templateUrl: './global-assessments-vedio.component.html',
  styleUrls: ['./global-assessments-vedio.component.scss']
})
export class GlobalAssessmentsVedioComponent implements OnInit {

  videoMp4FileName: string = "GlobalStudentAssessmentInsights.mp4";
  thumbnailFileName: string = "internationalAssessmentVedioThumbnail.png";
  thumbnailUrl: string = '';
  videoUrLMp4 : string = '';
  vedioPlaying: boolean = false;

  constructor(
    private router: Router,
    private api: APIService) {

      this.videoUrLMp4 = this.api.internationalAssessmentsVedio + this.videoMp4FileName;
      this.thumbnailUrl = this.api.internationalAssessmentsVedio + this.thumbnailFileName;
     }

  ngOnInit(): void { }

  // Corrected method to accept the parameters passed from the HTML
  playVideo(video: HTMLVideoElement, button: HTMLElement, thumbnail: HTMLElement): void {
    thumbnail.style.display = 'none';
    button.style.display = 'none';
    video.style.display = 'block';
    if(this.vedioPlaying)
    {
      this.vedioPlaying = false;
       video.pause;
    }
     
    else
    {
      video.play();
      this.vedioPlaying = true;
    }
      
    video.addEventListener('ended', () => {
      thumbnail.style.display = 'block';
      button.style.display = 'flex';
      video.style.display = 'none';
      this.vedioPlaying = false;
    });
  }

  navigateToAssessments()
  {
    this.router.navigate(['/assessments/list']);

  }
}