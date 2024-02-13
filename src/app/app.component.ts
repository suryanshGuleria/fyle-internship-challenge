import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { PageEvent } from '@angular/material/paginator';
import { userModel } from './models/user-model';
import { repoModel } from './models/repo-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username:string = '';
  userData:userModel = {};
  repoData:Array<repoModel>= [];
  perPage: number = 10; 
  pageNo: number =1; 
  isInitialized:boolean = false;
  isLoading:Boolean = false; 

  constructor(private apiService:ApiService,private dataService:DataService){
  }
  
  ngOnInit(): void {
    this.usernameChanges();
  }

  private usernameChanges(): void {
    this.dataService.username$.subscribe(name =>{
      console.log(name);
       this.username = name;
       if(this.isInitialized){
          this.isLoading = true;
          this.loadData();
       }
       this.isInitialized = true;
    });
  }

  private loadData(): void{
    this.apiService.fetchUserData(this.username).subscribe((userdata)=>{
      this.userData = userdata;
      console.log(userdata);
    })

    this.apiService.fetchReposData(this.username, this.pageNo, this.perPage).subscribe((repodata)=>{
      this.repoData = repodata;
      this.isLoading = false;
      console.log(this.repoData);
    })
  }

  handlePaginate(event: PageEvent) {
    this.pageNo = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.isLoading = true;
    this.loadData(); 
  }

  }
  
