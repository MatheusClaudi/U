import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/Board';
import { ListBoard } from '../models/ListBoard';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string;
  public newBoardSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api';
  }

  public save(board: Board) {
    const url = this.apiUrl + '/dashboard';
    return this.http.post<Board>(url, board);
  }

  public get(id) {
    const url = this.apiUrl + '/dashboard' + id;
    return this.http.get(url, id);
  }

  public getAll(): Observable<any> {
    const url = this.apiUrl + '/dashboard/all';
    return this.http.get(url);
  }

  public delete(id) {
    console.log('service');
    const url = this.apiUrl + '/dashboard/' + id;
    return this.http.delete(url);
  }
}
