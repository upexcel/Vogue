import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mp4-upload',
  templateUrl: './mp4-upload.component.html',
  styleUrls: ['./mp4-upload.component.css']
})
export class Mp4UploadComponent implements OnDestroy {
  uploader: FileUploader;

  constructor(public intermediateStorageService: IntermediateStorageService) {

    this.uploader = new FileUploader({
      url: `${environment['apiHost']}imageProcess/uploadMp4`,
      itemAlias: 'file'
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    if (this.intermediateStorageService.storeMp4Data) {
      this.uploader = this.intermediateStorageService.getMp4Data();
    }

    this.uploader.response.subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
    // Title: to clear the queue after completion
    // this.uploader.onCompleteAll = () => {
    //   this.uploader.clearQueue();
    // };
  }

  ngOnDestroy() {
    this.intermediateStorageService.setMp4Data(this.uploader)
  }
}
