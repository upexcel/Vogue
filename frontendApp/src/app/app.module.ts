import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './shared/api-service/api-service';
import { HeaderInterceptor } from './shared/http-interceptors/HeaderInterceptor';
import { ResponseInterceptor } from './shared/http-interceptors/ResponseInterceptor';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NewsfeedModule } from './newsfeed/newsfeed.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CollectionModule } from './collection/collection.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    NewsfeedModule,
    AppRoutingModule,
    CollectionModule
  ],
  providers: [ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
