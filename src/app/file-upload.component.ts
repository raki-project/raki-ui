import {Component,Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.css"]
})

//@Injectable({providedIn: 'root'})

export class FileUploadComponent {

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
