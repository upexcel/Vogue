
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                // retry(3),
                map(resp => {
                    if (resp instanceof HttpResponse) {
                        console.log('Response is ::');
                        console.log(resp.body)
                    }
                    return resp;
                }),
                catchError(err => {
                    if (err instanceof HttpResponse) {
                        console.log(err.status);
                        console.log(err.body);
                    }
                    return throwError(err);
                }));
    }
}
