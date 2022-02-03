// angular
import {NgModule} from '@angular/core';
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
// app
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
//
import {InfoDataComponent} from './info-data/info-data.component';
import {PrettyJsonPipe} from './prettyjson/prettyjson.pipe';

import {APP_INITIALIZER} from '@angular/core';
import {AppConfigService} from './app/AppConfigService';


@NgModule({
  declarations: [
    AppComponent,
    PrettyJsonPipe,
    InfoDataComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    //material
    MatSliderModule, MatIconModule, MatInputModule, MatDividerModule, MatSelectModule, MatProgressBarModule,
    //
    NgbModule
  ],
  providers: [ {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
