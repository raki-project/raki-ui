import {Injectable, Component, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {AppConfigService} from '../app/AppConfigService';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'inputComponent',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})

export class InputComponent {

    constructor(private http: HttpClient,private cfg: AppConfigService) {}

    @Input()
    requiredFileType:string;
    file : File;
    fileName : string = '';
    uploadProgress:number;
    uploadSub: Subscription;

    rulesAPI: string = this.cfg.api + 'rules';

    httpOptions = {
      //headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json' as const,
      reportProgress: true,
      observe: 'events' as const
    };

    selectedOntology: string;
    @Input()
    responseData : any;

    onFileSelected(event) {
        this.file = event.target.files[0];
        this.fileName = this.file.name;
    }

    fileUpload(){
      if (this.file) {
          const formData = new FormData();
          formData.append('axioms', this.file);
          formData.append('ontology', this.file);//TODO

          const upload$ = this.http.post(this.rulesAPI, formData, this.httpOptions).pipe(
              finalize(() => this.reset())
          )

          this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            }
            if (event.type === HttpEventType.Response) {
                this.responseData = event.body;
            }
          })
      }
    }
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
    this.file = null;
    this.fileName=null;
  }
}
