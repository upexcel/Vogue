import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
 

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  imageForm = new FormData();
  csvForm = new FormData();
  csvUploader: FileUploader;
  imageUploader: FileUploader;
  canUploadCsv: boolean;
  canUploadImage: boolean;
  constructor() { 
    this.csvUploader = new FileUploader({
      url: `${environment['apiHost']}products/createProducts`,
    });
    this.imageUploader = new FileUploader({
      url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    });
  } 
  

/*   uploadCsv(event) {
    // console.log(event.target.files)
    // if(event.target.files[0]) {
    //   this.canUploadCsv = true;
    //   let csv = event.target.files[0];
    //   this.imageForm.append('csv',csv);
    // }
  }

  uploadImage(event) {
    // if(event.target.files[0]) {
    //   this.canUploadImage = true;
    //   let images = event.target.files[0];
    //   this.imageForm.append('images',images);
    // }
  } */

}
