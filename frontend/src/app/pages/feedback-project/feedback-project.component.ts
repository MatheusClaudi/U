import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-project',
  templateUrl: './feedback-project.component.html',
  styleUrls: ['./feedback-project.component.css'],
})
export class FeedbackProjectComponent implements OnInit {
  private feedbackId: number;
  public feedback: any;
  public membros: Array<any> = [];
  public encontros: Array<any> = [];
  public currentPage = 1;

  constructor(private routeActive: ActivatedRoute, private router: Router, private feedbackService: FeedbackService) {
    this.routeActive.params.subscribe((params) => {
      this.feedbackId = params['id']
    })

    this.feedbackService.getFeedbackById(this.feedbackId).subscribe(feedback => {
      console.log(feedback);
      this.feedback = feedback;

      this.membros = this.feedback.usersFeedback;
      this.encontros = this.feedback.meetings
    })

  }

  ngOnInit(): void {
  }

  redirectToFeedback() {
    this.router.navigate(['/feedback']);
  }

  adjustString(word: String): String {
    if (!word) {
      return ""
    }
    let aux = word.toLowerCase();
    return aux.charAt(0).toUpperCase() + aux.slice(1);
  }

  adjustStatus(word: String): String {
    if (word == "TODO"){
      return "Pendente";
    }
    else {
      return "Feito";
    }
  }

}