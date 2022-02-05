import {Injectable, Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {InfoDataInterface} from './interface/info';
import {ConfigService} from '../app/config.service';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'info-data',
  templateUrl: 'info-data.component.html',
  styleUrls: ['info-data.component.css']
})

/** InfoDataComponent */
export class InfoDataComponent {

  constructor(private http: HttpClient,private cfg: ConfigService) {}

  infoAPI: string = this.cfg.api + 'info';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as const
  };



  /** GET data from the server */
  getData(): Observable<InfoDataInterface> {
    return this.http.get<InfoDataInterface>(this.infoAPI, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched data'))
      );
  }
}
