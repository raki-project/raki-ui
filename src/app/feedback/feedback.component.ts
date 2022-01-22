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

  @Input()
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {}

  apiURL: string = 'http://localhost:9081/feedback';
  responseData : any;

  submit():void{
    console.log("submit feedback");
    console.log(this.responseData);
  }
}
