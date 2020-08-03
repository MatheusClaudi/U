import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStory } from '../models/UserStory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class VotationCardService {
 
  private apiUrl: string;
 
  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api/votationCard';
  }

  public saveCardsToSprint(sprintId: number, cards): Observable<any> {
    let cardsSend = []
    for (let i = 0; i < cards.length; i++){
      cardsSend.push({ label: cards[i]})
    }
    console.log(cardsSend);
    const url = this.apiUrl + "/cards/" + sprintId;
    return this.http.post(url, cardsSend);
  }
}