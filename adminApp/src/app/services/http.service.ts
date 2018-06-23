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

  createUser(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment['apiHost']}user/createUser/`, body)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment['apiHost']}user/getAllusers/`)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

  updateUser(body) {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment['apiHost']}user/updateUser`, body)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment['apiHost']}user/deleteUser/${id}`)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment['apiHost']}user/getUserById/${id}`)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

  updatePost(body) {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment['apiHost']}newsfeed_post/updateNewsfeedPost`, body)
        .subscribe((data) => {
          if (data['status'] && data['status'] === 1) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }

  deletePost(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment['apiHost']}newsfeed_post/deleteNewsfeedPost/${id}`)
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
