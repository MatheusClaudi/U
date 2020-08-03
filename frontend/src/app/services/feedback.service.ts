import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/Board';

import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Card } from '../models/Card';
import { CreateFeedbackRequest } from '../models/CreateFeedbackRequest';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private FEEDBACK_API: string;
  private httpOptions: object;
  public newFeedbackSubject = new Subject<any>();


  constructor(private http: HttpClient) {
    const API = environment.API;
    this.FEEDBACK_API = API + '/api/feedback';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' }),
    };
  }

  createFeedback( request: CreateFeedbackRequest){
      let url =  `${this.FEEDBACK_API}/`;
      return this.http.post(url, request);
  }

  editFeedbackDeadline(feedbackId, date){
    let url = this.FEEDBACK_API + "/feedbackDeadline/" +feedbackId;
    return this.http.put(url, date);
  }


  addUserToFeedback(feedbackId, userId) {
    let url = this.FEEDBACK_API + "/feedbackMember/" + feedbackId + "/" + userId;
    return this.http.put(url, null);
  } 

  addUsersToFeedback(feedbackId, usersIdList) {
    let url = this.FEEDBACK_API + "/feedbackMember/" + feedbackId;
    return this.http.put(url, usersIdList);
  } 

  retrieveUserToFeedback(feedbackId, userId) {
    let url = this.FEEDBACK_API + "/feedbackMember/" + feedbackId + "/" + userId;
    return this.http.delete(url);
  } 

  retrieveUsesrFromFeedback(feedbackId, usersIdList) {
    let url = this.FEEDBACK_API + "/feedbackMembers/" + feedbackId ;
    return this.http.put(url, usersIdList);
  } 

  getAllFeedback(): Observable<any> {
    let url = `${this.FEEDBACK_API}/`;
    return this.http.get(url);
  }

  getFeedbackById(id): Observable<any> {
    let url = `${this.FEEDBACK_API}/` + id;
    return this.http.get(url);
  }

  setFeedbackStatus(id) {
    let url = `${this.FEEDBACK_API}/disableFeedback/${id}`;
    return this.http.put(url, id);
  }

  getFeedbackByStatus(status): Observable<any> {
    let url = `${this.FEEDBACK_API}/byStatus/${status.text}`;
    return this.http.get(url);
  }
}

