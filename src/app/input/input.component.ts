import {Injectable, Component, Input} from '@angular/core';
import {Subscription, throwError} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import {HttpClient, HttpEventType, HttpSentEvent, HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {ConfigService} from '../app/config.service';
import {LoggerService} from '../logger/logger.service';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'inputComponent',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})

export class InputComponent {

    constructor(
      private http: HttpClient,
      public cfg: ConfigService,
      public log: LoggerService
    ) {}

    @Input() requiredFileType: string;
    @Input() responseData: any = '';

    inputData: any;
    examplesFile: File;
    selectedOntology: string;
    uploadProgress: number;
    uploadSub: Subscription;

    // public

    /** sets vars  */
    onFileSelected(event) {
      this.examplesFile = event.target.files[0];
    }

    /** prepares the input and sends it */
    fileUpload(){
      if (this.examplesFile) {
        return this.examplesFile.text().then(
          data => {this.inputData = data}
        );
      }
    }

    /** prepares the input and sends it */
    fileSend(){
      if(this.selectedOntology){
        if (this.examplesFile){
          if (!this.inputData) {
            this.fileUpload().then(() => {this.fileSend()});
          }
        }
        if(this.isJson(this.inputData)){
          const file: File = new File([this.inputData], 'input.json', {
            type: 'application/json',
          });
          const formData = new FormData();
          formData.append('input', file);
          formData.append('ontologyName', this.selectedOntology);

          this.sendData(formData);
        }
      }else{
        this.log.warn('Select an ontology.');
      }
    }

    /** cancels upload and resets vars */
    cancelUpload() {
      this.uploadSub.unsubscribe();
      this.reset();
      this.log.info('Upload canceled.');
    }

    /** resets vars */
    reset() {
      this.uploadProgress = null;
      this.uploadSub = null;
      this.examplesFile = null;
    }

    setFeedback(feedback: any){
      if(this.isJson(feedback)){
        var i = this.isJson(this.inputData);
        var f = this.isJson(feedback)
        i['positives'] = Array.from(this.union(i['positives'],f['positives']));
        i['negatives'] = Array.from(this.union(i['negatives'],f['negatives']));
        this.inputData = JSON.stringify(i, null, 2);
        this.fileSend();
      }
    }

    // private

    /** sends the given input  */
    sendData(formData: FormData){
      const httpOptions = {
        responseType: 'json' as const,
        reportProgress: true,
        observe: 'events' as const
      }
      const upload$ = this.http.post(
        this.cfg.api + 'raki',
        formData,
        httpOptions
      ).pipe(
          finalize(() => this.reset())
      )

      this.uploadSub = upload$.subscribe(
        event => {this.handleEvent(event)},
        error => {this.handleError(error)}
      );
    }

    /** http event handle */
    handleEvent(event) {
      if (event.type === HttpEventType.Sent) {
          this.log.info('Sent request.');
      }
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        this.log.info('Uploading ' +   this.uploadProgress + '%.');
        if(this.uploadProgress == 100){
          this.log.info('Processing request...');
          this.uploadProgress = undefined;
        }
      }
      if (event.type === HttpEventType.Response) {
          this.responseData = event.body;
          this.log.info('Responsed.');
      }
      if (event.type === HttpEventType.Sent) {
          this.log.info('Sent request.');
      }
    }

    /** http error handle */
    handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        this.log.error(
          'An error occurred: ' + JSON.stringify(error.error)
        );
      } else {
        this.log.error(
          'Backend returned code ' + error.status +': ' + JSON.stringify(error.error)
        );
      }
      return throwError(
        () => new Error('Something bad happened; please try again later.')
      );
    }

    /** tries to parse the given input to json */
    isJson(str) {
      try {
          return JSON.parse(str);
      } catch (e) {
          this.log.error("Input isn't in json format.");
      }
      return false;
    }

    union(setA, setB) {
        let _union = new Set(setA)
        for (let elem of setB) {
            _union.add(elem)
        }
        return _union
    }
}
