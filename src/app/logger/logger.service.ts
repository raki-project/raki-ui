import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class LoggerService {

  lastInfo: string;
  lastWarn: string;
  lastError: string;

  info(message: string): void {
    this.clear();
    console.log(message);
    this.lastInfo = message;
  }

  warn(message: string): void {
    this.clear();
    console.warn(message);
    this.lastWarn = message;
  }

  error(message: string): void {
    this.clear();
    console.error(message);
    this.lastError = message;
  }

  clear(): void {
    this.lastInfo = '';
    this.lastWarn = '';
    this.lastError = '';
  }
}
