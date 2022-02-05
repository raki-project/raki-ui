import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private cfg: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.cfg = data;
      });
  }

  get api() {
    if (!this.cfg) {
      throw Error('Config file not loaded!');
    }
    return this.cfg.rakiWebapp;
  }
}
