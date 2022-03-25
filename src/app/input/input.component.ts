import {Injectable, Component, Input} from '@angular/core';
import {Subscription, throwError} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import {HttpClient, HttpEventType, HttpErrorResponse} from '@angular/common/http';
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
      private cfg: ConfigService,
      public log: LoggerService
    ) {}

    @Input() requiredFileType: string;
    @Input() responseData: any = '';

    // input via promt instead of a file
    //@Input()
    inputData: string = '';

    examplesFile: File;
    examplesFileName: string = '';

    selectedOntology: string;

    uploadProgress: number;
    uploadSub: Subscription;

    rulesAPI: string = this.cfg.api + 'raki';

    httpOptions = {
      //headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json' as const,
      reportProgress: true,
      observe: 'events' as const
    };

    onFileSelected(event) {
        this.examplesFile = event.target.files[0];
        this.examplesFileName = this.examplesFile.name;
    }

    sendData(formData: FormData){
      const upload$ = this.http.post(this.rulesAPI, formData, this.httpOptions).pipe(
          finalize(() => this.reset())
      )

      this.uploadSub = upload$.subscribe(event => {
        this.log.info('Uploading ...');

        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response) {
            this.responseData = event.body;
            this.log.info('Responsed.');
        }
      },
      error => {
        this.handleError(error);
      });
    }

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

    fileUpload(){
      if (this.examplesFile) {
        this.examplesFile.text().then((data)=>{
            this.inputData = data;
        });
      }
    }

    fileSend(){
      const formData = new FormData();
      if (this.examplesFile) {
        // input examples via file
        formData.append('input', this.examplesFile);
      }else if(this.inputData){
        // input via prompt
        const file: File = new File([this.inputData], 'input.json', {
          type: 'application/json',
        });

        formData.append('input', file);
      }

      if(formData.get('input')){
        formData.append('ontologyName', this.selectedOntology);
        this.sendData(formData);
      }else{
        this.log.warn('No input given.');
      }
    }

    cancelUpload() {
      this.uploadSub.unsubscribe();
      this.reset();
      this.log.info('Upload canceled.');
    }

    reset() {
      this.uploadProgress = null;
      this.uploadSub = null;
      this.examplesFile = null;
      this.examplesFileName=null;
    }
}
