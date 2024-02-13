import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ProfileBannerComponent } from './components/profile-banner/profile-banner.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';
import { TopicComponent } from './components/topic/topic.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { DataService } from './services/data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileBannerComponent,
    RepoCardComponent,
    SearchBarComponent,
    TopicComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatPaginatorModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
