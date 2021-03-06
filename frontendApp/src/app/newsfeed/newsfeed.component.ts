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
  limit = 10;
  items = [];
  loading: boolean;
  scrollList: any;
  totalCount: number;
  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;
  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.getNewsFeeds(this.page, this.limit).then((res: Array<any>) => {
      this.items = res;
    }, (err) => {
      console.log(err)
    });
  }

  onListChange(event: ChangeEvent) {
    console.log(event, this.items.length)
    if (event.end !== this.items.length || event.end === this.totalCount) { return };
    this.loading = true;
    ++this.page;
    this.getNewsFeeds(this.page, this.limit).then(chunk => {
      this.items = this.items.concat(chunk);
      this.loading = false;
    }, () => this.loading = false);
  }

  getNewsFeeds(page, limit) {
    return new Promise((resolve, reject) => {
      this._apiService.getNewsfeedPost(page, limit).subscribe((res) => {
        this.totalCount = res['totalCount'];
        // this.items = res['data']
        resolve(res['data']);
      }, (err) => {
        console.log(err)
        reject(err);
      })
    })
  }
}
