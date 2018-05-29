import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ApiService } from './api-service/api-service';
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
    ApiService
  ]
})
export class SharedModule { }
