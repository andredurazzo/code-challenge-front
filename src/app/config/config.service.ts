import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
//import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const endpoint = 'http://localhost:8182/';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient,
       ) {
            //this.handleError = httpErrorHandler.createHandleError('ConfigService');
        }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    
    }

    getRisk(): Observable<any> {
        return this.http.get(endpoint + 'risk/').pipe(
          map(this.extractData));
    }

    getAll(): Observable<any> {
        return this.http.get(endpoint + 'creditLimit/').pipe(
            map(this.extractData));
    }
    saveCreditLimit( body:any):Observable<any>{
        return this.http.post(endpoint + "creditLimit/", body, httpOptions).pipe(
            map(this.extractData)
          );
    }
}