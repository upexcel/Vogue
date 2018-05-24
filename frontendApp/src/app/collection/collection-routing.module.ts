import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { CollectionComponent } from './collection.component'

const routes: Routes = [
  { path: '', component: CollectionComponent, canActivate: [AuthenticationGuard], data: { title: 'CollectionComponent' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CollectionRoutingModule { }
