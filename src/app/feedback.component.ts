import {Injectable, Component, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
//import {MatIconModule} from '@angular/material/icon';
//import {MatProgressBarModule} from '@angular/material/progress-bar';

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

  onFileSelected(event) {
      const file:File = event.target.files[0];

      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("thumbnail", file);

          const upload$ = this.http.post("/api/thumbnail-upload", formData, {
              reportProgress: true,
              observe: 'events'
          })
          .pipe(
              finalize(() => this.reset())
          );

          this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / event.total));
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
  }
}