import {Injectable, Component, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})

export class FeedbackComponent {

//  @Input()
//  requiredFileType:string;

//  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  httpOptions = {
    //headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //responseType: 'json' as const,
    reportProgress: true,
    observe: 'events' as const
  };
  constructor(private http: HttpClient) {}

  apiURL: string = 'http://localhost:9081/feedback';
  inputData : any;
  responseData : any;

  submit():void{
    if(this.inputData){
      const file : File = new File([this.inputData], 'inputData.txt', {
        type: 'application/json',
      });

      const formData = new FormData();
      formData.append('feedback', file);

      const upload$ = this.http.post(this.apiURL, formData, this.httpOptions).pipe(
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

    }else{
      console.warn('No data given!');
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
