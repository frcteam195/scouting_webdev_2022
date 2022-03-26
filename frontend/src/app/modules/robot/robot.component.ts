import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, Teams, CurrTeams } from 'src/app/services/api.service';
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
  roboPic: String;
  apiCurrTeamList: CurrTeams[];


  //apiAnalysis: CEA[] = [];
  apiTeamsList: Teams[] = [];  

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));
    this.apiCurrTeamList = [];
    this.apiService.CurrTeamReplay.subscribe(currteam => {
      this.apiCurrTeamList = currteam;
    });
    this.team="195";
    this.display=1;
    this.roboPic = "https://cdn.discordapp.com/attachments/830144707794305064/949107933260677130/error_robot_not_found.png";
    //this.roboPic = "https://i.imgur.com/mDO77M8h.jpg";
  }

  setTeam(team: string) {
    console.log(team);
    this.team = team;
    if (this.team == "2168") {
      this.roboPic = "https://i.imgur.com/mDO77M8h.jpg";
    } else if(this.team == "2262") {
      this.roboPic = "https://i.imgur.com/SlnGsrTh.jpg";
    } else if(this.team == "195") {
      this.roboPic = "https://cdn.discordapp.com/attachments/830144707794305064/954762992946380850/IMG_3965.jpg";
    }
    else {
      this.roboPic = "https://cdn.discordapp.com/attachments/830144707794305064/949107933260677130/error_robot_not_found.png";
    }
  }
  //code for getting picture when eventually implemented to teams table
  /* getRoboPic(ID: Number) {
    for (let x of this.apiTeamsList){
      if (x.Team == ID) {
        return x.roboPicture;
      }
    }
    return "https://cdn.discordapp.com/attachments/830144707794305064/949107933260677130/error_robot_not_found.png";
  } */

  setDisplay(display: number) {
    this.display = display;
  }

  ngOnInit(): void {
    this.team = this.route.snapshot.paramMap.get('team') || '';
    //console.log("Check Robot: " + this.team)
  }

  
    
}
