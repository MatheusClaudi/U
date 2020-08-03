import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private AUTH_API: string;
  private CONFIRM_API: string;
  private RESET_API: string;
  private RESETP_API: string;
  private CHECK_API: string;
  private CHECK2_API: string;
  private httpOptions: object;

  constructor(private http: HttpClient) {
    const API = environment.API;
    this.AUTH_API = API + '/auth/login';
    this.CONFIRM_API =  API + '/api/users/activateAccount';
    this.CHECK_API = API + '/api/users/checkValidResetPasswordToken';
    this.RESET_API = API + '/api/users/sendResetPasswordEmail';
    this.RESETP_API = API + '/api/users/resetPassword';
    this.CHECK2_API = API + '/api/users/checkValidActivationAccountToken';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
   }

  login(credentials): Observable<any> {
    return this.http.post(this.AUTH_API, {
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions);
  }

  activeEmail(token: string): Observable<any> {
    return this.http.get(this.CONFIRM_API+"?token="+token)
  }

  sendResetPasswordEmail(email: string) {
    return this.http.post(this.RESET_API+"?userEmail="+email, null)
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(this.RESETP_API+"?token="+token+"&newPassword="+newPassword, null);
  }

  validateResetPasswordToken(token: string): Observable<any> {
    return this.http.get(this.CHECK_API+"?token="+token);
  }

  validateCheckActivateAccountToken(token: string): Observable<any> {
    return this.http.get(this.CHECK2_API+"?token="+token);
  }

}
