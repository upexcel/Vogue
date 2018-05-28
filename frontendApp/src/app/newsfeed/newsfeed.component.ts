import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api-service/api-service';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  page = 1;
  limit = 1000;
  items = ['Item1', 'Item2', 'Item3'];
  scrollList: any;
  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;
  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.getNewsFeeds();
  }

  getNewsFeeds() {
    this._apiService.getNewsfeedPost(this.page, this.limit).subscribe((res) => {
      console.log(res['data'][0])
      this.items = res['data']
    }, (err) => {
      console.log(err)
    })
  }




}
