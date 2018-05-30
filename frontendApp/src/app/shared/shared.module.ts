import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ApiService } from './api-service/api-service';
import { LocalStorageService } from './commom/local-storage.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    MainHeaderComponent
  ],
  exports: [
    LoaderComponent,
    MainHeaderComponent
  ],
  providers: [
    ApiService,
    LocalStorageService
  ]
})
export class SharedModule { }
