import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-search-bar',
  template: ''
})
class MockSearchBarComponent {}

@Component({
  selector: 'app-skeleton-loader',
  template: ''
})
class MockSkeletonLoaderComponent {}

@Component({
  selector: 'app-profile-banner',
  template: ''
})
class MockProfileBannerComponent {}

@Component({
  selector: 'app-repo-card',
  template: ''
})
class MockRepoCardComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockSearchBarComponent,
        MockSkeletonLoaderComponent,
        MockProfileBannerComponent,
        MockRepoCardComponent
      ],
      imports: [MatPaginatorModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display search bar', () => {
    const searchBar = debugElement.query(By.directive(MockSearchBarComponent));
    expect(searchBar).toBeTruthy();
  });

  it('should display skeleton loader when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const skeletonLoader = debugElement.query(By.directive(MockSkeletonLoaderComponent));
    expect(skeletonLoader).toBeTruthy();
  });

  it('should display profile banner and repo cards when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const profileBanner = debugElement.query(By.directive(MockProfileBannerComponent));
    const repoCards = debugElement.queryAll(By.directive(MockRepoCardComponent));
    expect(profileBanner).toBeTruthy();
    expect(repoCards.length).toBe(component.repoData.length);
  });

  it('should handle pagination event', () => {
    spyOn(component, 'handlePaginate');
    const paginator = debugElement.query(By.css('mat-paginator'));
    paginator.triggerEventHandler('page', { pageNo: 1, perPage: 10 });
    expect(component.handlePaginate).toHaveBeenCalledWith({ pageNo: 1, perPage: 10 });
  });
});
