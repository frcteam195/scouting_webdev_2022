import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';
import { Matches } from './match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

 redTeam1: string = "195";
 redTeam2: string = "181";
 redTeam3: string = "999";
 blueTeam1: string = "558";
 blueTeam2: string = "1071";
 blueTeam3: string = "2168";

  //apiAnalysis: CEA[] = [];
  apiMatchList: Matches[] = [];  

  constructor(private apiService: ApiService) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.MatchReplay.subscribe((match) => (this.apiMatchList = match));
  }

  ngOnInit(): void {
  }

}
