import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../services/http.service';
import * as _ from 'lodash';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  allPost: any;
  spinner: boolean;
  page = 1;
  limit = 100000;
  updatePostData: any;
  constructor(
    public formBuilder: FormBuilder,
    public _http: HttpClient,
    public snackBar: MatSnackBar,
    private httpService: HttpService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.createForm();
    this.fetchPost();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      userID: ['', Validators.required],
      inspirationalPhotoURL: ['', Validators.required],
      product1ID: ['', Validators.required],
      product2ID: ['', Validators.required],
      product3ID: ['', Validators.required],
      product4ID: ['', Validators.required]
    });
  }

  onSubmit(formValue) {
    if (this.spinner) {
      return;
    }
    this.spinner = true;
    if (this.updatePostData) {
      this.spinner = true;
      formValue['id'] = this.updatePostData['id'];
      this.httpService.updatePost(formValue).then((res) => {
        this.spinner = false;
        this.commonService.openSnackBar('Post Updated', false, 2000);
        this.fetchPost();
        this.postForm.reset();
      }).catch((err) => {
        this.spinner = false;
        this.commonService.openSnackBar((err && err.message) ? err.message : 'Something went Wrong', true, 2000);
        console.log(err);
      });
    } else {
      this._http.post(`${environment['apiHost']}newsfeed_post/createNewsfeedPost`, formValue).subscribe((res) => {
        console.log(res);
        this.spinner = false;
        if (res['status'] === 1) {
          this.snackBar.open('Post Added Successfully', '', {
            duration: 2000,
          });
          this.fetchPost();
        }
        this.postForm.reset();
      }, (err) => {
        this.spinner = false;
        console.log(err);
      });
    }
  }

  fetchPost() {
    this.spinner = true;
    this._http.get(`${environment['apiHost']}newsfeed_post/getNewsfeedPost/${this.limit}/${this.page}`).subscribe((res) => {
      this.spinner = false;
      this.allPost = res['data'];
    }, (err) => {
      this.spinner = false;
      console.log(err);
    });
  }


  deletePost(data) {
    if (this.spinner) {
      return;
    }
    this.spinner = true;
    this.httpService.deletePost(data.id).then((res) => {
      _.remove(this.allPost, data);
      this.spinner = false;
      this.commonService.openSnackBar('Post Deleted', false, 2000);
    }).catch((err) => {
      this.spinner = false;
      this.commonService.openSnackBar((err && err.message) ? err.message : 'Something went Wrong', true, 2000);
      console.log(err);
    });
  }

  updatePost(updatePostData) {
    this.updatePostData = updatePostData;
    this.postForm = this.formBuilder.group({
      title: [updatePostData['title'], Validators.required],
      userID: [updatePostData['userID'], Validators.required],
      inspirationalPhotoURL: [updatePostData['inspirationalPhotoURL'], Validators.required],
      product1ID: [updatePostData['product1ID'], Validators.required],
      product2ID: [updatePostData['product2ID'], Validators.required],
      product3ID: [updatePostData['product3ID'], Validators.required],
      product4ID: [updatePostData['product4ID'], Validators.required]
    });
  }

}
