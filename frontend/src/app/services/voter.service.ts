import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStory } from '../models/UserStory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class VoterService {
 
  private apiUrl: string;
 
  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api/voter';
  }

  public vote(voterId, vote): Observable<any>{
    let url = this.apiUrl + "/vote/" + voterId;
    return this.http.post(url, vote);
  }

}