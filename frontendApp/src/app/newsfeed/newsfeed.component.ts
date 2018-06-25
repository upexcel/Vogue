import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ApiService } from '../shared/api-service/api-service';
import { VirtualScrollComponent, ChangeEvent } from 'angular2-virtual-scroll';

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
  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;
  constructor(
    private _apiService: ApiService
  ) { }

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
}
