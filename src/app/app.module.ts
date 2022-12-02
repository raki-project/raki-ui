// angular
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
//angular material
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
// app
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
//
import {PrettyJsonPipe} from './prettyjson/prettyjson.pipe';

import {ConfigService} from './app/config.service';
import {FeedbackComponent} from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    PrettyJsonPipe,
    FeedbackComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    //material
    MatSliderModule, MatIconModule, MatInputModule,  MatDividerModule, MatSelectModule, MatProgressBarModule, MatCheckboxModule, 
    //
    NgbModule
  ],
  providers: [ {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        return () => {
          return cfg.loadConfig();
        };
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
