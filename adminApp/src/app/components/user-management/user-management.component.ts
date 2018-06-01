import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/local-storage.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService,
    public formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      profilePhotoUrl: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

}
