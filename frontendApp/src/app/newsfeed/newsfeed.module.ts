import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { NewsfeedRoutingModule } from './newsfeed-routing.module';
import { NewsfeedComponent } from './newsfeed.component';

@NgModule({
  imports: [
    CommonModule,
    NewsfeedRoutingModule
  ],
  declarations: [
    NewsfeedComponent
  ]
})
export class NewsfeedModule { }
