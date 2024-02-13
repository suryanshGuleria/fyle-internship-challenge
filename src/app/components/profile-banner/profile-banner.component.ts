import { Component, Input, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss']
})
export class ProfileBannerComponent implements OnInit{
    @Input() userData:any;

    constructor(){
    }
  
    ngOnInit(): void {
      console.log(this.userData);
    }
   
}
