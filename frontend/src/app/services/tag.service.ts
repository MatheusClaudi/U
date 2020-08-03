import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl: String;
  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api';
  }

  public save(tag: Tag) {
    const url = this.apiUrl + '/tag';
    return this.http.post<Tag>(url, tag);
  }

  public delete(id) {
    const url = this.apiUrl + '/tag/' + id;
    return this.http.delete(url);
  }

  public updateTag(id, tag: Tag) {
    const url = this.apiUrl + '/tag/' + id;
    return this.http.put<Tag>(url, { text: tag.text });
  }

  public getAllTags(): Observable<any> {
    const url = this.apiUrl + '/tag/all';
    return this.http.get(url);
  }
}
