import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api-service/api-service';
import * as Blazy from "blazy";

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  page = 1;
  limit = 100000;
  items = [];
  loading: boolean;
  totalCount: number;
  constructor(
    private _apiService: ApiService,
    private router: Router
  ) {
    var bLazy = new Blazy({
      // Multi-serve images based on screen size. Go to multi-serve image example
      breakpoints: false,
      // If you want to lazy load images inside a scrolling container change the default value to the selector of the container
      //   container: window,
      //   // Callback for when something goes wrong. There are two error messages, missing and invalid. You’ll get missing if no data-src is defined. Invalid if the data-src is invalid.
      //   error: function (ele, msg),
      //   // The classname an image will get if something goes wrong.
      //   errorClass: 'b-error',
      //   // The offset controls how early you want the images to be loaded before they’re visible. Default is 100, so 100px before an image is visble it’ll start loading.
      //   offset: 100,
      //   // Used if you want to pass retina images: data-src=”image.jpg|image@2x.jpg”.
      //   separator: '|',
      //   // Callback for when an image has loaded. 
      //   success: function (ele),
      //   // The classname an image will get when loaded.
      //   successClass: 'b-loaded',
      //  // Image selector for images that should lazy load. If you want to lazy load all images write ‘img’. You can add multiple selectors separated with comma; ‘.b-lazy, .bLazy, .blazy’
      //  selector: '.b-lazy',
      // Attribute where the original image source can be found
      src: 'data-src'
    });
  }

  ngOnInit() {
    this.loading = true;
    this._apiService.getNewsfeedPost(this.page, this.limit).subscribe((res) => {
      this.totalCount = res['totalCount'];
      this.items = res['data'];
      this.loading = false;
    }, (err) => {
      this.loading = false;
      console.log(err)
    })
  }
  goToCollation(id) {
    setTimeout(() => {
      this.router.navigate([`collection/${id}`]);
    })
  }
}
