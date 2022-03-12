import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, CurrTeams } from 'src/app/services/api.service';
import { Matches } from '../../matches';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() isOdd: number; //1 = odd, 0 = even

  redTeam1: string = "195";
  redTeam2: string = "195";
  redTeam3: string = "195";
  blueTeam1: string = "195";
  blueTeam2: string = "195";
  blueTeam3: string = "195";
  matchNo: number = 1;
  hiTeam: string = "";
  team: string = "All";


  apiMatchList: Matches[];
  apiMatchList_filter: Matches[]; 
  apiCurrTeamList: CurrTeams[];

  constructor(private apiService: ApiService, private router: Router) {
    this.isOdd=0;
    this.apiMatchList = [];
    this.apiMatchList_filter = [];
    this.apiCurrTeamList = [];

    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });

    this.apiService.CurrTeamReplay.subscribe(currteam => {
      this.apiCurrTeamList = currteam;
    });

  }

  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNo=match;
    this.regenerateFilter();

  }
  teamPage(team: string) {
    console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  matchPage(match: number) {
    console.log("Calling Match Page with: " + match)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/match/'+match, '_blank'); }); 
  }


  teamSelect(team: string) {
    //console.log("Current Team: " + this.team);
    if (team == this.hiTeam) {
        this.hiTeam = "";
        console.log("Highlight off");
    } else {
      this.hiTeam = team;
      //console.log("Highlighting Robot: " + team);
    }
        
  }

  
  setTeam(team: string) {
    console.log(team);
    this.team = team;
    this.regenerateFilter()
  }



  regenerateFilter() {

    //console.log("Made it to Filter with [" + this.matchNo + "]");
    if (this.apiMatchList) {
      this.apiMatchList_filter = [];
      var teamList = [];
      for (const m of this.apiMatchList) {
        teamList=[m.RedTeam1, m.RedTeam2, m.RedTeam3, m.BlueTeam1, m.BlueTeam2, m.BlueTeam3];
        if (this.team == "All") {
          this.apiMatchList_filter.push(m);
        } 
        else if (teamList.includes(this.team))  {
          this.apiMatchList_filter.push(m);
        }
      }
      if (this.team != "All") {
        this.teamSelect(this.team);
      }
        
    } else {
      console.log("No Match List Found");
    }

  }

  ngOnInit(): void {

  }

}
