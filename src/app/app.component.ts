import {Component, OnInit} from '@angular/core';
import {InputComponent} from './input/input.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ConfigService} from './app/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public cfg: ConfigService,
    public inputComponent: InputComponent,
    public feedbackComponent: FeedbackComponent
  ) { }

  ngOnInit(): void {
    this.cfg.init();
  }
}
