import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  username:string = 'suryanshGuleria';
  constructor(private dataService: DataService) { }
  
  setUser(){
    this.dataService.updateUsername(this.username);
 } 
   ngOnInit(): void {
    this.setUser();
   } 
}
