import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  allPost: any;
  spinner: boolean;

  constructor(public formBuilder: FormBuilder, public _http: HttpClient, public snackBar: MatSnackBar) { }

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
    this.spinner = true;
    this._http.post(`${environment['apiHost']}newsfeed_post/createNewsfeedPost`, formValue).subscribe((res) => {
      console.log(res);
      this.spinner = false;
      if (res['status'] == 1) {
        this.snackBar.open('Post Added Successfully', '', {
          duration: 2000,
        });
        this.fetchPost();
      }
      this.postForm.reset();
    }, (err) => {
      this.spinner = false;
      console.log(err);
    })
  }

  fetchPost() {
    this.spinner = true;
    this._http.get(`${environment['apiHost']}newsfeed_post/getNewsfeedPost`).subscribe((res) => {
      this.spinner = false;
      this.allPost = res['data'];
    }, (err) => {
      this.spinner = false;
      console.log(err);
    });
  }

}
