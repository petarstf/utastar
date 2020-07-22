import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = environment.serverUrl;
  tableSent = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  postTable(body: any, options?): Observable<any> {
    this.tableSent = true;
    return this.httpClient.post(this.url, body);
  }

  getResponse(): Observable<any> {
    return this.httpClient.get('assets/data/response.json');
  }
}
