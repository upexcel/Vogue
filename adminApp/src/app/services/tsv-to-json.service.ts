import { Injectable } from '@angular/core';
declare let window: any;
@Injectable()
export class TsvToJsonService {
  parseXml: any
  constructor() {
  }

  tsvJSON(tsv) {
    var lines = tsv.split("\n");

    var result = [];

    var headers = lines[0].split("\t");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split("\t");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

}