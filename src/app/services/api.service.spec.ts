import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const mockUser = {
      login: 'testuser',
      id: 123,
      // other properties...
    };

    const username = 'testuser';

    service.fetchUserData(username).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch repositories data', () => {
    const mockRepos = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' }
      // other repositories...
    ];

    const username = 'testuser';
    const pageNo = 1;
    const perPage = 10;

    service.fetchReposData(username, pageNo, perPage).subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${pageNo}&per_page=${perPage}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should handle errors when fetching user data', () => {
    const username = 'invaliduser';

    service.fetchUserData(username).subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error'));
  });

  it('should handle errors when fetching repositories data', () => {
    const username = 'testuser';
    const pageNo = 1;
    const perPage = 10;

    service.fetchReposData(username, pageNo, perPage).subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${pageNo}&per_page=${perPage}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error'));
  });
});
