import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-photo-management',
  templateUrl: './product-photo-management.html',
  styleUrls: ['./product-photo-management.css']
})
export class ProductPhotoManagementComponent implements OnInit {
  imageForm = new FormData();
  csvForm = new FormData();
  canUploadCsv: boolean;
  canUploadImage: boolean;
  uploader = new FileUploader({
    url: `${environment['apiHost']}imageProcess/uploadImage`,
  });
  constructor() { }

  ngOnInit() {
  }

  saveImages(images) {
    console.log(images)
    this.uploader.onBuildItemForm = (item, form) => {
      _.map(images, (value, key) => {
        console.log(value, key)
        form.append(key, value);
      });
    };
    setTimeout(() => {
      this.uploader.uploadAll();
    });
  }

}
