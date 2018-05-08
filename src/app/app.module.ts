import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload'
import { HttpClientModule } from '@angular/common/http';

import { LocalStorageService } from './services/local-storage.service';
import { IntermediateStorageService } from './services/intermediateStorage.service';
import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { Mp4UploadComponent } from './components/mp4-upload/mp4-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ProductPhotoManagementComponent } from './components/product-photo-management/product-photo-management.component';
import { BrowseContentComponent } from './components/browse-content/browse-content.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ProductManagementComponent,
    CreatePostComponent,
    Mp4UploadComponent,
    HeaderComponent,
    BrowseContentComponent,
    ProductPhotoManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
  ],
  providers: [
    LocalStorageService,
    IntermediateStorageService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
