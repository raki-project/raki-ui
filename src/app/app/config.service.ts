import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {InfoDataInterface} from './interface/info';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private cfg: any;
  public info: any;

  constructor(
    private http: HttpClient
  ) {}

  init() {
     this.loadConfig().then(()=>{
        this.loadData().subscribe(data => {
          this.info = data;
        })
    });
  }

  /** Reads config file */
  loadConfig() {
    return this.http.get('/assets/config.json').toPromise().then(
      data => {this.cfg = data}
    );
  }

  get api(): string {
    if (!this.cfg) {
      throw Error('Config file not loaded!');
    }
    return this.cfg.rakiBackend;
  }

  get get(): any {
    if (!this.cfg) {
      throw Error('Config file not loaded!');
    }
    return this.cfg;
  }

  /** GET data from the server */
  loadData(): Observable<InfoDataInterface> {
    return this.http.get<InfoDataInterface>(
      this.api + 'info',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json' as const
      })
      .pipe(
        //tap(_ => console.log('fetched data'))
      );
  }
}
