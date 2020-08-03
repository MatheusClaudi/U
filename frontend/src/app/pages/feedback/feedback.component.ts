import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { CreateFeedbackRequest } from '../../models/CreateFeedbackRequest';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FeedbackService],
})
export class FeedbackComponent implements OnInit {
  feedbacks: Array<CreateFeedbackRequest> = [];
  public currentPage = 1;
  public InativoStyle;

  constructor(public router: Router, public feedBackService: FeedbackService) {}

  ngOnInit() {
    this.feedBackService.newFeedbackSubject.subscribe((feedbackCreated) => {
      this.feedbacks.push(feedbackCreated);
    });

    this.feedBackService.getAllFeedback().subscribe((feedbacks) => {
      feedbacks.forEach((feedback) => {
        this.feedbacks.push(feedback);
      });
    });
  }

  redirectTo(feedback) {
    this.router.navigate(['/feedback-project', feedback.id]);
  }

  redirectToCreateFeedBack() {
    this.router.navigate(['/create-feedback']);
  }

  setStatus(feedback) {
    this.feedBackService.setFeedbackStatus(feedback.id).subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.feedbacks = [];
    this.feedBackService.getAllFeedback().subscribe((feedbacks) => {
      this.feedbacks = feedbacks;
    });
  }

  goToEdit(feedback){
    this.router.navigate(["/edit-feedback", feedback.id])
  }


  updateFeebackListByStatus(status: any) {
    console.log('Filtrar por status:', status.text);
    this.feedBackService.getFeedbackByStatus(status).subscribe((feedbacks) => {
      this.feedbacks = [];
      feedbacks.forEach((feedback) => {
        this.feedbacks.push(feedback);
      });
    });
  }

  cleanFiltering(status: any) {
    console.log('Limpar filtragem:', status.text);
    this.feedBackService.getAllFeedback().subscribe((feedbacks) => {
      this.feedbacks = [];
      feedbacks.forEach((feedback) => {
        this.feedbacks.push(feedback);
      });
    });
  }
}
