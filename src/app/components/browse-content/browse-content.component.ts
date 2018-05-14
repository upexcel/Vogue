import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-browse-content',
  templateUrl: './browse-content.component.html',
  styleUrls: ['./browse-content.component.css']
})

export class BrowseContentComponent implements OnInit {
  allPost: any;
  spinner: boolean;
  constructor(
    public _http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchPost();
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

  deletePost(post) {
    console.log(post, this.spinner);
    if (this.spinner) {
      return false;
    }
    this.spinner = true;
    this._http.delete(`${environment['apiHost']}newsfeed_post/deleteNewsfeedPost/${post['id']}`).subscribe((res) => {
      this.spinner = false;
      this.snackBar.open('Post Deleted Successfully', '', {
        duration: 2000,
      });
      _.remove(this.allPost, {
        id: post['id']
      });
    }, (err) => {
      this.spinner = false;
      console.log(err);
    });
  }

}
