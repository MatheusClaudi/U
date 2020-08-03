import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStory } from '../models/UserStory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class VotationRoomService {
 
  private apiUrl: string;
 
  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api/votationRoom';
  }

  public saveRoom(sprintId: String, userEmail: String): Observable<any>{
    const url = this.apiUrl + "/" + userEmail + "/" + sprintId;
    return this.http.post(url, null);
  }

  public getRoomBySprintId(sprintId: String): Observable<any>{
    const url = this.apiUrl + "/bySprint/" + sprintId;
    return this.http.get(url);
  }

  public getRoomById(Id: String): Observable<any>{
    const url = this.apiUrl + "/byId/" + Id;
    return this.http.get(url);
  }

  public addNewLogedDev(roomId: String, userEmail: String): Observable<any>{
    const url = this.apiUrl + "/userLoged/" + roomId + "/" +  userEmail;
    return this.http.post(url, null); 
  }

  public addNewNotLogedDev(roomId: String, name: String): Observable<any>{
    const url = this.apiUrl + "/userNotLoged/" + roomId + "/" +  name;
    return this.http.post(url, null); 
  }

  public removeDev(roomId: String, voterId: String): Observable<any>{
    const url = this.apiUrl + "/voter/" + roomId + "/" +  voterId;
    return this.http.delete(url);
  }

  public async sendBeaconToRemoveDev(roomId: String, voterId: String) {
    var headers = {type: 'application/json'};
    var blob = new Blob([], headers);
    
    let url = this.apiUrl + "/voter/" + roomId + "/" +  voterId;

    return navigator.sendBeacon(url , blob);
  }

  public listVoterInRoom(roomId: String): Observable<any> {
    const url = this.apiUrl + "/voters/" + roomId;
    return this.http.get(url);
  }

  public listVoterInRoomThatVoted(roomId: String): Observable<any> {
    const url = this.apiUrl + "/voters/" + roomId + "/voted";
    return this.http.get(url);
  }

  public changeUsInVotation(roomId, usId): Observable<any> {
    const url = this.apiUrl + "/userStory/" + roomId + "/" + usId;
    return this.http.put(url, null);
  }

  public endCurrentVotation(roomId, value): Observable<any>{
    const url = this.apiUrl + "/userStory/" + roomId + "/" + value;
    return this.http.delete(url);
  }

  public cleanVotes(roomId): Observable<any>{
    const url = this.apiUrl + "/voter/" + roomId + "/cleanVotes";
    return this.http.delete(url);    
  }

  public checkValidRoom(roomId: String): Observable<any> {
    const url = this.apiUrl + "/voters/"+ roomId + "/valid";
    return this.http.get(url);
  }

  public setVotationStatus(roomId: String, status: boolean): Observable<any>{
    const url = this.apiUrl + "/statusVotation/" + roomId + "/" + status;
    return this.http.put(url, null);
  }
}