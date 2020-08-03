import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStory } from '../models/UserStory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class UserStoryService {
 
  private apiUrl: string;
 
  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api/userStory';
  }

  public saveUserStoryToSprint(sprintId: number, userStory: UserStory): Observable<any>{
    const url = this.apiUrl + "/userStories/" + sprintId;
    return this.http.post(url, userStory);
  }

  public getUserStoryById(userStoryId): Observable<any>{
    const url = this.apiUrl + "/userStories/" + userStoryId;
    return this.http.get(url);
  }
}