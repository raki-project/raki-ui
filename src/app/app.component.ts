import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//
import {Logger} from './logger/logger.service';
import {FeedbackComponent} from './feedback/feedback.component';
import {InfoDataComponent} from './info-data/info-data.component';
import {InfoData} from './info-data/interface/info';

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
    private feedbackComponent: FeedbackComponent
  ) { }

  infodata: InfoData;
  selectedOntology: string;
  ontology: any=[];

  ngOnInit() {
    this.intiInfodata();
  }

  intiInfodata(): void {
    this.infoDataComponent.getData()
      .subscribe(infodata => {
        this.infodata = infodata;
        this.ontology = infodata.ontology;
      });
  }

  // select file
  selectedFiles = '';
  selectFile(event) {
      this.selectedFiles = event.target.files;
  }
  clearSelectFile(){
    this.selectedFiles = '';
  }

  // feedbackForm
  feedbackFormResponse = '';
  feedbackForm = new FormGroup({
    input: new FormControl(),
  });

  feedbackFormSubmit() {
    this.log.info(this.feedbackForm.controls.input.value);
    this.log.info(this.selectedFiles);
    this.log.info(this.selectedOntology);
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
