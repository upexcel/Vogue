import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/local-storage.service';

import * as _ from 'lodash';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  userTable: any;
  editData: any;
  loading: boolean;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public formBuilder: FormBuilder,
    public commonService: CommonService
  ) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      profilePhotoUrl: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createUser(userForm) {
    const body = {
      Name: userForm.name,
      Profile_photo_url: userForm.profilePhotoUrl,
      Description: userForm.description
    };
    this.loading = true;
    this.httpService.createUser(body).then((res) => {
      this.loading = false;
      this.userForm.reset();
      if (res['status'] == 1) {
        this.commonService.openSnackBar('User Added Successfully', false, 2000);
        this.getAllUsers();
      }
    }).catch((err) => {
      this.commonService.openSnackBar((err && err.message) ? err.message : 'Something went Wrong', false, 2000);
      console.log(err);
    })
  }

  getAllUsers() {
    this.httpService.getAllUsers().then((res) => {
      if (res['status'] == 1) {
        this.userTable = res['data']
      }
    }).catch((err) => {
      this.commonService.openSnackBar((err && err.message) ? err.message : 'Something went Wrong', false, 2000);
      console.log(err);
    })
  }

  deleteUser(data) {
    this.httpService.deleteUser(data.id).then((res) => {
      _.remove(this.userTable, data);
    }).catch((err) => {
      this.commonService.openSnackBar((err && err.message) ? err.message : 'Something went Wrong', false, 2000);
      console.log(err);
    })
  }

}
