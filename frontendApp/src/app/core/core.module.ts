import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
  ]
})
export class CoreModule {

  constructor() {
  }

}
