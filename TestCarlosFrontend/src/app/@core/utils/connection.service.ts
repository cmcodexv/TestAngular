import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private headers!: HttpHeaders;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertSvc: AlertService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthToken()
    });
  }

  private getAuthToken():string {
    return localStorage.getItem('token') || '';
  }

  send(type: string, path: string, params: any = null): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthToken()
    });

    let promise = new Promise((resolve, reject) => {
      switch(type) {
        case 'get':
          this.http.get<any>(`${ URL }/${ path }`, { headers: headers })
                  .subscribe({
                    next: (response: any) => {
                      resolve(response);
                    },
                    error: (error: any) => {
                      reject(error);
                    }
                  }); break;
        case 'post':
          this.http.post<any>(`${ URL }/${ path }`, params, { headers: headers })
                  .subscribe({
                    next: (response: any) => {
                      resolve(response);
                    },
                    error: (error: any) => {
                      reject(error);
                    }
                  }); break;
        case 'delete':
          this.http.delete<any>(`${ URL }/${ path }`, { headers: headers })
                  .subscribe({
                    next: (response: any) => {
                      resolve(response);
                    },
                    error: (error: any) => {
                      reject(error);
                    }
                  }); break;
        }
    });

    return promise.catch( async (error: any) => {
      if ( error.error == null || error.error.error != undefined) {
        return error;
      }

      let  { error_message, token_invalid } = error.error;

      // serach string error_message if exists "Request procesing failed"
      if ( error_message != undefined && error_message.indexOf('Request processing failed') != -1 ) {
        return;
      }
    });

  }
  

}
