import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

  constructor(public http: HttpClient) { }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment['apiHost']}products/getProducts`)
        .subscribe((data) => {
          resolve(data);
        })
    })
  }

}
