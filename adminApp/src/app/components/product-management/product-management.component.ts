import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { TsvToJsonService } from '../../services/tsv-to-json.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})

export class ProductManagementComponent implements OnInit, OnDestroy {
  @ViewChild('tsv')
  resetTSV: any;
  typeError: boolean;
  tsvUploader: FileUploader;
  csvTable: any;
  badTSV: boolean;
  spinner: boolean;
  productSearchText: string;
  errorMessage: string;
  constructor(
    public _tsv2JsonConverter: TsvToJsonService,
    public httpService: HttpService,
    public intermediateStorageService: IntermediateStorageService,
    public localStorageService: LocalStorageService
  ) {
    this.tsvUploader = new FileUploader({
      url: `${environment['apiHost']}products/createProducts`,
      itemAlias: 'file',
      autoUpload: !(this.typeError || this.badTSV),
    });

    if (this.intermediateStorageService.storeCsvData) {
      this.tsvUploader = this.intermediateStorageService.getCsvData();
    }

    this.tsvUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    this.tsvUploader.response.subscribe(res => {
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
    this.badTSV = false;
    if (this.tsvUploader.queue.length > 1) {
      this.tsvUploader.queue[0].cancel();
      this.tsvUploader.queue.shift();
    }
    if (event.target.files[0]) {
      if (event.target.files[0]['name'].substr(event.target.files[0]['name'].lastIndexOf('.') + 1).toLowerCase() === 'tsv') {
        this.typeError = false;
      } else {
        this.typeError = true;
        this.tsvUploader.clearQueue();
      }
      const reader: FileReader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = (e) => {
        this.tsvToJson(reader.result);
      };
    }
  }


  tsvToJson(tsv) {
    let tsv2json = JSON.parse(this._tsv2JsonConverter.tsvJSON(tsv));
    _.forEach(tsv2json, (data, key) => {
      if (!(data.ProductID && data.ProductID.length && data.ProductName && data.ProductName.length)) {
        this.badTSV = true;
        this.tsvUploader.clearQueue();
        return false;
      }
    })
    if (this.badTSV) {
      return false;
    }
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
    this.resetTSV.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.intermediateStorageService.setCsvData(this.tsvUploader);
  }

}
