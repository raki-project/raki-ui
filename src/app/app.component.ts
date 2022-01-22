import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//
import {Logger} from './logger/logger.service';
import {InputComponent} from './input/input.component';
import {InfoDataComponent} from './info-data/info-data.component';
import {InfoData} from './info-data/interface/info';
import {FeedbackComponent} from './feedback/feedback.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title: string = 'RAKI GUI';
  infoURL: string = 'http://localhost:9081/info/';

  constructor(
    private log: Logger,
    private http: HttpClient,
    private infoDataComponent: InfoDataComponent,
    public inputComponent: InputComponent,
    public feedbackComponent: FeedbackComponent
  ) { }

  ontology: any=[];
  // version: any=[];

  ngOnInit() {
    this.intiInfodata();
  }

  intiInfodata(): void {
    this.infoDataComponent.getData()
      .subscribe(infodata => {
        this.ontology = infodata.ontology;
        // this.version = infodata.version;
      });
  }

  // feedbackForm
  feedbackFormResponse = '';
  feedbackForm = new FormGroup({
    input: new FormControl(),
  });

  feedbackFormSubmit() {
    this.log.info(this.feedbackForm.controls.input.value);
    this.feedbackFormResponse = 'Loading...';

    setTimeout(() => {
        (async () => {
          let baseUrl = 'http://localhost:9081/info';
          const value = this.feedbackForm.controls.input.value;
          if (value != null) {
            baseUrl = baseUrl + '?path=' + value;
          }
          const response = await fetch(baseUrl.toString());
          // tslint:disable-next-line:triple-equals
          if (response.status != 200) {
            this.feedbackFormResponse = 'Bad Request Error. \n' + response.body;
          } else {
            this.feedbackFormResponse = await response.json();
          }
        })();
      },
      2000);
  };
}
