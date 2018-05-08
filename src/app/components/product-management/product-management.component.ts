import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})

export class ProductManagementComponent {
  @ViewChild('csv')
  resetCsv: any;
  csvUploader: FileUploader;

  constructor() {
    this.csvUploader = new FileUploader({
      url: `${environment['apiHost']}products/createProducts`,
      // url: 'https://evening-anchorage-3159.herokuapp.com/api/',
      itemAlias: 'file',
      allowedMimeType: ['text/csv'],
      removeAfterUpload: true
    });

    this.csvUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.csvUploader.response.subscribe(res => {
      if (res) {
        console.log(res);
      }
      this.reset();
    });
  }
  reset() {
    this.resetCsv.nativeElement.value = "";
  }

}
