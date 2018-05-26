import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {

    }

    getNewsfeedPost() {
        return this.http.get(`/newsfeed_post/getNewsfeedPost/:limit/:page`)
    }
}
