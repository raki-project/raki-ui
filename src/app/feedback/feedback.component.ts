import {Injectable, Component, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {ConfigService} from '../app/config.service';
import { Output, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'feedback-component',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})

export class FeedbackComponent {

  @Output() feedbackEvent = new EventEmitter<any>();

  emitFeedback(value: any) {
      this.feedbackEvent.emit(value);
  }
}
