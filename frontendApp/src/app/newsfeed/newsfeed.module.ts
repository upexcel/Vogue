import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { NewsfeedRoutingModule } from './newsfeed-routing.module';
import { NewsfeedComponent } from './newsfeed.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewsfeedRoutingModule,
    SharedModule
  ],
  declarations: [
    NewsfeedComponent
  ]
})
export class NewsfeedModule { }
