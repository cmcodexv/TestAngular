import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: any = null;
  public identity: any = '';
  public headers!: HttpHeaders;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }


  login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${URL}/identity/authenticate`, user)
        .subscribe({
          next: (response: any) => {
            let { token } = response;
            if (!token) {
              reject('Incorrect credentials!');
            } else {
              localStorage.setItem('token', token);
              resolve(response);
            }
          }, error: (error: any) => {
            resolve(error);
          }, complete: () => {
            //console.log('Complete');
          }
        })
    });
  }

  async getIdentity() {
    let value = localStorage.getItem('identity');
    let identity = (value != null) ? value : '';
    if (identity && identity != "undefined")
      this.identity = identity;
    else
      this.identity = null;

    return this.identity;
  }

  async getToken() {
    let token = localStorage.getItem('token');
    if (token != "undefined") {
      this.token = token;
    }
    else {
      this.token = null;
    }
    return this.token;
  }

  async validaToken(): Promise<boolean> {
    await this.getToken();
    if (!this.token && this.token != '') {
      this.router.navigate(['/auth/login']);
      return Promise.resolve(false);
    }

    return new Promise<boolean>(async resolve => {

      this.getIdentity();
      if (this.identity && this.identity !== '') {
        resolve(true);
      }
      else {
        resolve(false);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  async logout() {
    this.token = null;
    this.identity = null;
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.router.navigate(['/auth/login']);
  }


}
