import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent implements OnInit{
   @Input() repoData:any;

  ngOnInit(): void {
    console.log(this.repoData.topic)
  }
}
