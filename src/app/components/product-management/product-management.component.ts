import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import { LocalStorageService } from '../../services/local-storage.service';


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
  spinner: boolean;

  ngOnInit() {
    if(this.localStorageService.getItem('tableData')) {
      this.csvTable = this.localStorageService.getItem('tableData');
    }
    this.getProducts();
  }

  constructor(public httpService: HttpService, public intermediateStorageService: IntermediateStorageService, public localStorageService: LocalStorageService) {
    
    this.csvUploader = new FileUploader({
      url: `${environment['apiHost']}products/createProducts`,
      // url: 'https://evening-anchorage-3159.herokuapp.com/api/',
      itemAlias: 'file',
      allowedMimeType: ['text/csv'],
      autoUpload: !this.typeError,
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
    if (this.csvUploader.queue.length > 1) this.csvUploader.queue.shift();
    if (event.target.files[0]) {
      let validType = ['text/csv'];
      if (validType.indexOf(event.target.files[0].type) == -1) {
        this.typeError = true;
        this.csvUploader.clearQueue();
      } else {
        this.typeError = false;        
      }
    }
  }

  getProducts() {
    this.spinner = true;
    this.httpService.getProducts().then((res) => {
      this.spinner = false;
      this.localStorageService.setItem('tableData',res);
      this.csvTable = this.localStorageService.getItem('tableData');
    }).catch((err)=>{
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
