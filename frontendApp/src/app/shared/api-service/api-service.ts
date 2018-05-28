import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {

    }

    getNewsfeedPost(page, limit) {
        return this.http.get(`${environment['apiBaseUrl']}/newsfeed_post/getNewsfeedPost/${limit}/${page}`)
    }
}
