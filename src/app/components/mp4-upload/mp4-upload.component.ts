import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-mp4-upload',
  templateUrl: './mp4-upload.component.html',
  styleUrls: ['./mp4-upload.component.css']
})
export class Mp4UploadComponent implements OnDestroy {
  uploader: FileUploader;

  constructor(public intermediateStorageService: IntermediateStorageService) {

    this.uploader = new FileUploader({
      url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    });

    if (this.intermediateStorageService.storeMp4Data) {
      this.uploader = this.intermediateStorageService.getMp4Data();
    }
    //Title: to clear the queue after completion
    // this.uploader.onCompleteAll = () => {
    //   this.uploader.clearQueue();
    // };
  }

  ngOnDestroy() {
    this.intermediateStorageService.setMp4Data(this.uploader)
  }
}
