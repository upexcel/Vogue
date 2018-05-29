import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { NewsfeedComponent } from './newsfeed.component';

const routes: Routes = [
  { path: '', component: NewsfeedComponent, canActivate: [AuthenticationGuard], data: { title: 'newsfeed', depth: 1 } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NewsfeedRoutingModule { }
