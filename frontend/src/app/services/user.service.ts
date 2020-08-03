import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    const API = environment.API;
    this.apiUrl = API + '/api';
  }

  public findAll(): Observable<User[]> {
    const url = this.apiUrl + '/users';
    return this.http.get<User[]>(url);
  }

  public findAllByKeyword(keyword: String): Observable<User[]> {
    const url = this.apiUrl + '/users/byKeyword/' + keyword;
    return this.http.get<User[]>(url);
  }

  public save(user: User) {
    const url = this.apiUrl + '/users';
    return this.http.post<User>(url, user);
  }

  public saveAdmin(user: User) {
    const url = this.apiUrl + '/users/admin';
    return this.http.post<User>(url, user);
  }

  public existUserWithUserName(userName: String): Observable<boolean> {
    const url = this.apiUrl + '/checkEmail?value=' + userName;
    return this.http.get<boolean>(url);
  }

  public getUserData(email: String): Observable<User> {
    const url = this.apiUrl + '/users/' + email;
    return this.http.get<User>(url);
  }

  public existUserWithEmail(email: String): Observable<boolean> {
    const url = this.apiUrl + '/users/checkEmail?value=' + email;
    return this.http.get<boolean>(url);
  }

  public updateUserInfo(userInfo: User): Observable<any> {
    let url = this.apiUrl + '/users/userInfo';
    return this.http.put(url, userInfo);
  }

  public deleteUser(email: String) {
    const url = this.apiUrl + '/users/deleteUser?userEmail=' + email;
    return this.http.delete(url);
  }

  public updateInfoUserFromSystem(userInfo: User, userId): Observable<any> {
    let url = this.apiUrl + '/users/userInfo/' + userId;
    return this.http.put(url, userInfo);
  }

  public updateUserPasswordFromSystem(pass, userId): Observable<any> {
    let url = this.apiUrl + '/users/userPassword/' + userId + '/' + pass;
    return this.http.put(url, null);
  }

  public deleteUserFromSystem(userId) {
    const url = this.apiUrl + '/users/deleteUser/' + userId;
    return this.http.delete(url);
  }

  public enableUser(userId): Observable<any> {
    let url = this.apiUrl + '/users/enableUser/' + userId;
    return this.http.put(url, null);
  }

  public unableUser(userId): Observable<any> {
    let url = this.apiUrl + '/users/unableUser/' + userId;
    return this.http.put(url, null);
  }

  public retrieveUserAdmin(userId): Observable<any> {
    let url = this.apiUrl + '/users/retrieveUserAdmin/' + userId;
    return this.http.put(url, null);
  }

  public giveUserAdmin(userId): Observable<any> {
    let url = this.apiUrl + '/users/giveUserAdmin/' + userId;
    return this.http.put(url, null);
  }

  public checkValidUser(): Observable<any> {
    let url = this.apiUrl + '/users/checkValidUser';
    return this.http.get(url);
  }

  public isUserAdmin(): Observable<any> {
    let url = this.apiUrl + '/users/checkRoleAdmin';
    return this.http.get(url);
  }

  public isUserClient(): Observable<any> {
    let url = this.apiUrl + '/users/checkRoleClient';
    return this.http.get(url);
  }
}
