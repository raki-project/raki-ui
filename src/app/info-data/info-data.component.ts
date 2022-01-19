import {Injectable, Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})


@Component({
  selector: 'info-data',
  templateUrl: 'info-data.component.html',
  styleUrls: ['info-data.component.css']
})


export class InfoDataComponent {
  infoURL: string = 'http://localhost:9081/info';
  infoData :{};
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as const
  };

  constructor(
    private http: HttpClient
  ) {}

  getData() {
    this.http.get(this.infoURL, this.httpOptions)
    .subscribe(
      (response) => {
        console.log(response);
        this.infoData = response;
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Request completed');
      })
  }
}
