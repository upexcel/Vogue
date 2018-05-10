import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import { LocalStorageService } from '../../services/local-storage.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})

export class ProductManagementComponent implements OnInit, OnDestroy {
  @ViewChild('csv')
  resetCsv: any;
  typeError: boolean;
  csvUploader: FileUploader;
  csvTable: any;
  csvJson: any;
  badCsv: boolean;
  spinner: boolean;

  ngOnInit() {
    if (this.localStorageService.getItem('tableData')) {
      this.csvTable = this.localStorageService.getItem('tableData');
    }
    this.getProducts();
  }

  constructor(public httpService: HttpService, public intermediateStorageService: IntermediateStorageService, public localStorageService: LocalStorageService) {
    this.csvUploader = new FileUploader({
      url: `${environment['apiHost']}products/createProducts`,
      itemAlias: 'file',
      autoUpload: !(this.typeError || this.badCsv),
    });

    if (this.intermediateStorageService.storeCsvData) {
      this.csvUploader = this.intermediateStorageService.getCsvData();
    }

    this.csvUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.csvUploader.response.subscribe(res => {
      if (res) {
        this.getProducts();
      }
      this.reset();
    });
  }

  checkType(event) {
    this.typeError = false;
    this.badCsv = false;
    if (this.csvUploader.queue.length > 1) {
      this.csvUploader.queue[0].cancel();
      this.csvUploader.queue.shift();
    }
    if (event.target.files[0]) {
      if (event.target.files[0]['name'].substr(event.target.files[0]['name'].lastIndexOf('.') + 1).toLowerCase() == 'csv') {
        this.typeError = false;
      } else {
        this.typeError = true;
        this.csvUploader.clearQueue();
      }
      let reader: FileReader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = (e) => {
        let csv: string = reader.result;
        this.csvToJson(csv);
      }
    }
  }

  csvToJson(csv) {
    let lines = csv.split("\n");
    this.csvJson = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      this.csvJson.push(obj);
    }
    _.forEach(this.csvJson, (value, key) => {
      _.forEach(value, (data, field) => {
        if (field == 'ProductID' || field == 'ProductName') {
          if (data == "") {
            this.badCsv = true;
            this.csvUploader.clearQueue();
            return false;
          }
        }
      })
      if (this.badCsv) {
        return false;
      }
    })
  }

  getProducts() {
    this.spinner = true;
    this.httpService.getProducts().then((res) => {
      this.spinner = false;
      this.localStorageService.setItem('tableData', res);
      this.csvTable = this.localStorageService.getItem('tableData');
    }).catch((err) => {
      this.spinner = false;
      console.log(err);
    })
  }

  reset() {
    this.resetCsv.nativeElement.value = "";
  }

  ngOnDestroy() {
    this.intermediateStorageService.setCsvData(this.csvUploader)
  }

}
