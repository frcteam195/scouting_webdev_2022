import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, Teams } from 'src/app/services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {

  team: string;
  analysisGroup: number = 2;
  display: number;


  //apiAnalysis: CEA[] = [];
  apiTeamsList: Teams[] = [];  

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));

    this.team="195";
    this.display=2;
  }

  setTeam(team: string) {
    console.log(team);
    this.team = team;
  }

  setDisplay(display: number) {
    this.display = display;
  }

  ngOnInit(): void {
    this.team = this.route.snapshot.paramMap.get('team') || '';
    //console.log("Check Robot: " + this.team)
  }

  
    
}
