import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IQuestion, IUserAnswer } from 'src/app/DTOs/assessments.interfaces';

@Component({
  selector: 'app-assessment-questions',
  templateUrl: './assessment-questions.component.html',
  styleUrls: ['./assessment-questions.component.scss']
})
export class AssessmentQuestionsComponent implements OnInit {
   private sanitizer = inject(DomSanitizer);

    @Input() question!: IQuestion;
    @Input() currentAnswer!: IUserAnswer | null;

    @Output() onAnswer = new EventEmitter<IUserAnswer>();

    public questionBodyHtml!: SafeHtml;

    ngOnInit(): void {
        if (this.question?.bodyHtml) {
            this.questionBodyHtml = this.sanitizeHtml(this.question.bodyHtml);
        }
    }

    sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    isSelected(choiceId: string): boolean {
        return this.currentAnswer?.selectedChoiceId === choiceId;
    }

    selectChoice(choiceId: string): void {
        const newAnswer: IUserAnswer = {
            questionId: this.question.id,
            selectedChoiceId: choiceId,
        };
        this.onAnswer.emit(newAnswer);
    }
}
