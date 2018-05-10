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
      itemAlias: 'file',
      autoUpload: true,
    });

    if (this.intermediateStorageService.storeImageData) {
      this.imageUploader = this.intermediateStorageService.getImageData();
    }

    this.imageUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      this.imageTable = '';
      this.imageTableError = '';
    }

    this.imageUploader.response.subscribe((res) => {
      if (res) {
        this.response = JSON.parse(res);
        this.imageTable = this.response['data'].length ? this.response['data'] : null;
        this.imageTableError = this.response['errors'].length ? this.response['errors'] : null;
      }
      this.reset();
    });
  }

  checkType(event) {
    if (this.imageUploader.queue.length > 1) {
      this.imageUploader.queue[0].cancel();
      this.imageUploader.queue.shift();
    }
    if (event.target.files[0]) {
      if (event.target.files[0]['name'].substr(event.target.files[0]['name'].lastIndexOf('.') + 1).toLowerCase() == 'zip') {
        this.typeError = false;
      } else {
        this.typeError = true;
        this.imageUploader.clearQueue();
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
