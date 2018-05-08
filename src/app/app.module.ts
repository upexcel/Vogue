import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload'



import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { Mp4UploadComponent } from './components/mp4-upload/mp4-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { BrowseContentComponent } from './components/browse-content/browse-content.component';
import { LocalStorageService } from './services/local-storage.service';
import { IntermediateStorageService } from './services/intermediateStorage.service';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FileUploadModule,
  ],
  providers: [
    LocalStorageService,
    IntermediateStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
