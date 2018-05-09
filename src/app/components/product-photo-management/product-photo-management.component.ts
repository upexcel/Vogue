import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-product-photo-management',
  templateUrl: './product-photo-management.component.html',
  styleUrls: ['./product-photo-management.component.css']
})
export class ProductPhotoManagementComponent implements OnDestroy {
  @ViewChild('image')
  resetImage: any;
  typeError: boolean;
  imageUploader: FileUploader;
  imageTable: any;
  imageTableError: any;
  response: any;

  constructor(public intermediateStorageService: IntermediateStorageService, public localStorageService: LocalStorageService) {
    this.imageUploader = new FileUploader({
      url: `${environment['apiHost']}imageProcess/uploadImage`,

      // url: 'https://evening-anchorage-3159.herokuapp.com/api/',
      itemAlias: 'file',
      autoUpload: true,
    });

    if (this.intermediateStorageService.storeImageData) {
      this.imageUploader = this.intermediateStorageService.getImageData();
    }

    this.imageUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.imageUploader.response.subscribe((res) => {
      if (res) {
        this.response = JSON.parse(res);
        this.imageTable = this.response['data'].length ? this.response['data'] : null;
        this.imageTableError = this.response['errors'].length ? this.response['errors'] : null;
        console.log(this.response);
      }
      console.log(this.imageTable);
      console.log(this.imageTableError);
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
    this.reset();
    this.imageUploader.clearQueue();
  }
}
