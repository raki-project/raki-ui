import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class LoggerService {

  info(message: string) {
    console.log(message);
  };

  warn(message: string) {
    console.warn(message);
  };

  error(message: string) {
    console.error(message);
  };
};
