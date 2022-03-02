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
  analysisTypes: string[] = ["NumWheels", "NumDriveMotors", "WheelTypeID", "DriveTypeID", "MotorTypeID", "LanguageID", "Speed", "GearRatio", 
                    "NumGearSpeed", "RobotLength", "RobotWidth", "RobotHeight", "RobotWeight", "Pneumatics", "IntakeType", "Preload", 
                    "HasAuto", "AutoScoredHigh", "AutoScoredLow", "MoveBonus", "AutoPickUp", "AutoStartPosID", "AutoSummary", "AutoHuman", 
                    "TeleBallsScoredHigh", "TeleBallsScoredLow", "MaxBallCapacity", "TeleDefense", "TeleDefenseEvade", "TeleStrategy", 
                    "TeleDefenseStrat", "TeleSortCargo", "TeleShootWhileDrive", "CanClimb", "ClimbPosition", "ClimbStrategy", "ClimbTime", 
                    "ClimbHeightID", ];


  //apiAnalysis: CEA[] = [];
  apiTeamsList: Teams[] = [];  

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));

    this.team="195";
  }

  setTeam(team: string) {
    console.log(team);
    this.team = team;
  }

  ngOnInit(): void {
 /*    this.route.queryParams.subscribe(params => {
      this.team = params['team'];
    }); */
    //this.team = this.route.snapshot.paramMap.get('team');
    console.log(this.route.snapshot.paramMap.get('team'));
  }

  
    
}
