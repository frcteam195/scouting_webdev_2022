import { Component, OnInit } from '@angular/core';
import { ApiService, Teams } from 'src/app/services/api.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {


  analysisGroup: number = 2;
  selectedTeam: string = "1";

  //apiAnalysis: CEA[] = [];
  apiTeamsList: Teams[] = [];  

  constructor(private apiService: ApiService) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));
  }

  
  ngOnInit(): void {
  }

}
