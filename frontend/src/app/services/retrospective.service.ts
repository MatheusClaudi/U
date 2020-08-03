import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/Board';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveService {
  private RETROSPECTIVE_API: string;
  private httpOptions: object;

  constructor(private http: HttpClient) {
    const API = environment.API;
    this.RETROSPECTIVE_API = API + '/api/dashboard';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  getBoard(retrospectiveID: number): Observable<Board> {
    const url = `${this.RETROSPECTIVE_API}/${retrospectiveID}`;
    return this.http.get<Board>(url, this.httpOptions);
  }

  addNewCard(
    retrospectiveID: number,
    listID: number,
    cardContent: string
  ): Observable<Card> {
    const url = `${this.RETROSPECTIVE_API}/${retrospectiveID}/list/${listID}/card`;
    return this.http.post<Card>(url, { text: cardContent }, this.httpOptions);
  }

  editCard(retrospectiveID: number, listID, newCard: Card): Observable<Card> {
    const url = `${this.RETROSPECTIVE_API}/${retrospectiveID}/list/${listID}/card/${newCard.id}`;
    return this.http.put<Card>(url, newCard, this.httpOptions);
  }

  removeCard(retrospectiveID: number, listID, cardID: number) {
    const url = `${this.RETROSPECTIVE_API}/${retrospectiveID}/list/${listID}/card/${cardID}`;
    return this.http.delete(url, this.httpOptions);
  }

  valid(id): Observable<any> {
    const url = `${this.RETROSPECTIVE_API}/valid/${id}`;
    return this.http.get<Board>(url, this.httpOptions);
  }
}

