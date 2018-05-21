import { Injectable } from '@angular/core';

@Injectable()
export class IntermediateStorageService {
  storeMp4Data;
  storeCsvData;
  storeImageData;
  constructor() { }

  setMp4Data(value) {
    this.storeMp4Data = value;
  }

  getMp4Data() {
    return this.storeMp4Data;
  }

  setCsvData(value) {
    this.storeCsvData = value;
  }

  getCsvData() {
    return this.storeCsvData;
  }

  setImageData(value) {
    this.storeImageData = value;
  }

  getImageData() {
    return this.storeImageData;
  }
}
