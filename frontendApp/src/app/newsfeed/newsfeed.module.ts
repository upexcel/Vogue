import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { NewsfeedRoutingModule } from './newsfeed-routing.module';
import { NewsfeedComponent } from './newsfeed.component';
import { SharedModule } from '../shared/shared.module';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

@NgModule({
  imports: [
    CommonModule,
    NewsfeedRoutingModule,
    SharedModule,
    VirtualScrollModule
  ],
  declarations: [
    NewsfeedComponent
  ]
})
export class NewsfeedModule { }
