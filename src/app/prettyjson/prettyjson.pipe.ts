declare let json2html: any;
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'prettyjson'
})

export class PrettyJsonPipe implements PipeTransform {


  constructor() { }

  transform(json: any, ...args: any[]): any {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
  json = JSON.parse(json).response;
    let template = {'<>':'div','text':'${nl} (${dl})'};
    return json2html.render(json,template)
  }

  _transform(json: any, ...args: any[]): any {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}
