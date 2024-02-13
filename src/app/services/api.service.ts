import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { userModel } from '../models/user-model';
import { repoModel } from '../models/repo-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   
  private baseUrl:string = `https://api.github.com/users/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  fetchUserData(githubUsername: string){
    return this.httpClient.get<userModel>(`${this.baseUrl}${githubUsername}`)
      .pipe(
        catchError(error => {
          console.warn(`Error fetching repositories:${error}`);
          return throwError(error);
        })
      );
    }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  fetchReposData(githubUsername: string,pageNo: number, perPage: number){
    return this.httpClient.get<any[]>(`${this.baseUrl}${githubUsername}/repos?page=${pageNo}&per_page=${perPage}`)
      .pipe(
        catchError(error => {
          alert(`Profile not Found`);
          return throwError(error);
        })
      );
  }
}


  
