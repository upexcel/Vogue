import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ApiService } from './api-service/api-service';
import { LocalStorageService } from './commom/local-storage.service';
import { NovakClickDirective } from './directives/novak-click-directive';
import { BlazyDirective } from './directives/angular2-blazy';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    MainHeaderComponent,
    NovakClickDirective,
    BlazyDirective
  ],
  exports: [
    LoaderComponent,
    MainHeaderComponent,
    NovakClickDirective,
    BlazyDirective
  ],
  providers: [
    ApiService,
    LocalStorageService
  ]
})
export class SharedModule { }
