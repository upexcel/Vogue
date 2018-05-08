import { Injectable } from '@angular/core';

@Injectable()
export class IntermediateStorageService {
  storeData;
  constructor() { }

  setData(value) {
    this.storeData = value;
  }

  getData() {
    return this.storeData;
  }
}
