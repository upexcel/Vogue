import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IntermediateStorageService } from '../../services/intermediateStorage.service';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-mp4-upload',
  templateUrl: './mp4-upload.component.html',
  styleUrls: ['./mp4-upload.component.css']
})
export class Mp4UploadComponent implements OnInit, OnDestroy {
  uploader: FileUploader;
  spinner: boolean;
  MP4Table: any;
  constructor(public intermediateStorageService: IntermediateStorageService, public httpService: HttpService) {

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
  ngOnInit() {
    this.getMP4();
  }

  getMP4() {
    this.spinner = true;
    this.httpService.getMP4s().then((res) => {
      console.log(res)
      this.spinner = false;
      this.MP4Table = res;
    }).catch((err) => {
      this.spinner = false;
      console.log(err);
    });
  }

  viewVideo(url) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  ngOnDestroy() {
    this.intermediateStorageService.setMp4Data(this.uploader)
  }
}
