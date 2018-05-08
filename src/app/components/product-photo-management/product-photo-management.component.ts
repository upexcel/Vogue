import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-photo-management',
  templateUrl: './product-photo-management.component.html',
  styleUrls: ['./product-photo-management.component.css']
})
export class ProductPhotoManagementComponent {
  @ViewChild('image')
  resetImage: any;
  imageUploader: FileUploader;

  constructor() {
    this.imageUploader = new FileUploader({
      url: `${environment['apiHost']}imageProcess/uploadImage`,

      // url: 'https://evening-anchorage-3159.herokuapp.com/api/',
      itemAlias: 'file',
      removeAfterUpload: true
    });

    this.imageUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.imageUploader.response.subscribe(res => {
      if (res) {
        console.log(res);
      };
      this.reset();
    });
  }
  reset() {
    this.resetImage.nativeElement.value = ""
  }
}
