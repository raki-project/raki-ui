import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


//material
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
//
//
//
import {InfoDataComponent} from './info-data/info-data.component';
import {PrettyJsonPipe} from './prettyjson.pipe';
//
//

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
    MatSliderModule, MatIconModule, MatInputModule, MatDividerModule, MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
