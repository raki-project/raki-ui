import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'prettyjson'
})
export class PrettyJsonPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return JSON.stringify(value, null, 4)
      .replace(/ /g, '&nbsp;') // note the usage of `/ /g` instead of `' '` in order to replace all occurences
      .replace(/\n/g, '<br/>'); // same here
  }
}
