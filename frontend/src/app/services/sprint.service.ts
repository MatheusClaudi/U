import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sprint } from '../models/Sprint';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class SprintService {
 
  private apiUrl: string;
 
  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api/sprint';
  }

  public findAllSprintsFromUser(userEmail: String): Observable<any>{
    const url = this.apiUrl + "/sprints/" + userEmail;
    return this.http.get(url);
  }

  public saveSprintToUser(userEmail: String, sprint: Sprint): Observable<any>{
    const url = this.apiUrl + "/sprints/" + userEmail;
    return this.http.post(url, sprint);
  }

  public getCardsFromSprint(sprintId): Observable<any>{
    const url = this.apiUrl + "/cards/" + sprintId;
    return this.http.get(url);
  }

  public deleteSprint(sprintId): Observable<any>{
    const url = this.apiUrl + "/" + sprintId;
    return this.http.delete(url);
  }
}
