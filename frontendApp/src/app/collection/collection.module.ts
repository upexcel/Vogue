import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule
  ],
  declarations: [
    CollectionComponent
  ]
})
export class CollectionModule { }
