import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';

@Component({
  selector: 'app-product-photo-management',
  templateUrl: './product-photo-management.component.html',
  styleUrls: ['./product-photo-management.component.css']
})
export class ProductPhotoManagementComponent implements OnDestroy{
  @ViewChild('image')
  resetImage: any;
  typeError: boolean;
  imageUploader: FileUploader;

  constructor(public intermediateStorageService: IntermediateStorageService) {
    this.imageUploader = new FileUploader({
      url: `${environment['apiHost']}imageProcess/uploadImage`,

      // url: 'https://evening-anchorage-3159.herokuapp.com/api/',
      itemAlias: 'file',
      autoUpload: true,
    });

    if(this.intermediateStorageService.storeImageData) {
      this.imageUploader = this.intermediateStorageService.getImageData();
    }

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

  checkType(event) {
    if (this.imageUploader.queue.length > 1) this.imageUploader.queue.shift();
    if (event.target.files[0]) {
      let validType = ['application/zip'];
      if (validType.indexOf(event.target.files[0].type) == -1) {
        this.typeError = true;
        this.imageUploader.clearQueue();
      } else {
        this.typeError = false;        
      }
    }
  }

  reset() {
    this.resetImage.nativeElement.value = ""
  }

  ngOnDestroy() {
    this.intermediateStorageService.setImageData(this.imageUploader);
  }
}
