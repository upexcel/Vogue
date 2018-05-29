import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() { }
  set(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
      return JSON.parse(localStorage.getItem(key));
  }

  remove(key) {
      localStorage.removeItem(key);
  }

  reset() {
      localStorage.clear();
  }
}
