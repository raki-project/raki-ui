import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//
import {LoggerService} from './logger/logger.service';
import {InputComponent} from './input/input.component';
import {InfoDataComponent} from './info-data/info-data.component';
import {InfoDataInterface} from './info-data/interface/info';
import {FeedbackComponent} from './feedback/feedback.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title: string = 'RAKI GUI';

  constructor(
    private log: LoggerService,
    private http: HttpClient,
    private infoDataComponent: InfoDataComponent,
    public inputComponent: InputComponent,
    public feedbackComponent: FeedbackComponent
  ) { }

  ontology: any=[];
  version: any=[];

  ngOnInit() {
    this.intiInfodata();
  }

  intiInfodata(): void {
    this.infoDataComponent.getData()
      .subscribe(infodata => {
        this.ontology = infodata.ontology;
        this.version = infodata.version;
      });
  }
}
