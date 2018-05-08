import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { Mp4UploadComponent } from './components/mp4-upload/mp4-upload.component';
import { BrowseContentComponent } from './components/browse-content/browse-content.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'product-management',
    component: ProductManagementComponent
  },
  {
    path: 'create-post',
    component: CreatePostComponent
  },
  {
    path: 'browse-content',
    component: BrowseContentComponent
  },
  {
    path: 'mp4-upload',
    component: Mp4UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

