import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  imageForm = new FormData();
  csvForm = new FormData();
  canUploadCsv: boolean;
  canUploadImage: boolean;
  uploader = new FileUploader({
    url: `${environment['apiHost']}products/createProducts`,
  });
  constructor() { }

  ngOnInit() {
  }

  uploadCsv(event) {
    console.log(event.target.files)
    if (event.target.files[0]) {
      this.canUploadCsv = true;
      let csv = event.target.files[0];
      this.csvForm.append('csv', csv);
    }
  }

  saveCsv(uploadCsvs) {
    console.log(uploadCsvs)
    this.uploader.onBuildItemForm = (item, form) => {
      _.map(uploadCsvs, (value, key) => {
        console.log(value, key)
        form.append(key, value);
      });
    };
    setTimeout(() => {
      this.uploader.uploadAll();
    });

  }

  uploadImage(event) {
    if (event.target.files[0]) {
      this.canUploadImage = true;
      let images = event.target.files[0];
      this.imageForm.append('images', images);
    }
  }

}
