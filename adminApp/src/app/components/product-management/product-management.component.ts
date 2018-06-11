import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { XmlToJsonService } from './../../xml-to-json.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})

export class ProductManagementComponent implements OnInit, OnDestroy {
  @ViewChild('xml')
  resetXml: any;
  typeError: boolean;
  xmlUploader: FileUploader;
  csvTable: any;
  badXml: boolean;
  spinner: boolean;
  productSearchText: string;
  errorMessage: string;
  constructor(
    public _xml2JsonConverter: XmlToJsonService,
    public httpService: HttpService,
    public intermediateStorageService: IntermediateStorageService,
    public localStorageService: LocalStorageService
  ) {
    this.xmlUploader = new FileUploader({
      url: `${environment['apiHost']}products/createProducts`,
      itemAlias: 'file',
      autoUpload: !(this.typeError || this.badXml),
    });

    if (this.intermediateStorageService.storeCsvData) {
      this.xmlUploader = this.intermediateStorageService.getCsvData();
    }

    this.xmlUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    this.xmlUploader.response.subscribe(res => {
      // if (res) {
      //   this.getProducts();
      // }
      this.reset();
    });
  }

  ngOnInit() {
    // if (this.localStorageService.getItem('tableData')) {
    //   this.csvTable = this.localStorageService.getItem('tableData');
    // }
    // this.getProducts();
    /*	This work is licensed under Creative Commons GNU LGPL License.
*/

  }


  checkType(event) {

    this.typeError = false;
    this.badXml = false;
    if (this.xmlUploader.queue.length > 1) {
      this.xmlUploader.queue[0].cancel();
      this.xmlUploader.queue.shift();
    }
    if (event.target.files[0]) {
      if (event.target.files[0]['name'].substr(event.target.files[0]['name'].lastIndexOf('.') + 1).toLowerCase() === 'xml') {
        this.typeError = false;
      } else {
        this.typeError = true;
        this.xmlUploader.clearQueue();
      }
      const reader: FileReader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = (e) => {
        this.xmlToJson(reader.result);
      };
    }
  }


  xmlToJson(xml) {
    let xml2json = JSON.parse(this._xml2JsonConverter.xmlToJsonService(xml, '  '));
    _.forEach(xml2json, (value, key) => {
      _.forEach(value, (val, fileds) => {
        _.forEach(val, (data, field) => {
          if (!(data.ProductID && data.ProductID.length && data.ProductName && data.ProductName.length)) {
            this.badXml = true;
            this.xmlUploader.clearQueue();
            return false;
          }
        });
      })
      if (this.badXml) {
        return false;
      }
    });
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
    });
  }

  searchProducts(productId) {
    if (!productId) {
      return false;
    }
    this.spinner = true;
    this.errorMessage = null;
    this.csvTable = [];
    this.httpService.searchProduct(productId).then((res) => {
      this.spinner = false;
      if (res && res['data'].length === 0) {
        this.errorMessage = 'Product Not Found !';
      }
      this.csvTable = res;
    }).catch((err) => {
      this.spinner = false;
      console.log(err);
    });
  }

  reset() {
    this.resetXml.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.intermediateStorageService.setCsvData(this.xmlUploader);
  }

}
