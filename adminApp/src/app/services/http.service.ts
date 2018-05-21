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
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }
  getMP4s() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment['apiHost']}imageProcess/getMp4`)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }
  searchProduct(productID) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment['apiHost']}products/searchProducts/${productID}`)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

}
