import {Injectable, Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {InfoData} from './interface/info';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'info-data',
  templateUrl: 'info-data.component.html',
  styleUrls: ['info-data.component.css']
})

/** InfoDataComponent */
export class InfoDataComponent {

  infoURL: string = 'http://localhost:9081/info';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as const
  };

  constructor(
    private http: HttpClient
  ) {}

  /** GET data from the server */
  getData(): Observable<InfoData> {
    return this.http.get<InfoData>(this.infoURL, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched data'))
      );
  }
}
