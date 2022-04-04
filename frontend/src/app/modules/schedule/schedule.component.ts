import { C } from '@angular/cdk/keycodes';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, CurrTeams, Final24 } from 'src/app/services/api.service';
import { Matches } from '../../matches';

export interface TeamMatch {
  Team: string;
  MatchNo: number;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() isMobile: number; //1 = mobile, 0 = standard

  @Output() sendMatchEvent = new EventEmitter<number>();
  @Output() sendTeamEvent = new EventEmitter<string>();

  redTeam1: string = "195";
  redTeam2: string = "195";
  redTeam3: string = "195";
  blueTeam1: string = "195";
  blueTeam2: string = "195";
  blueTeam3: string = "195";
  matchNo: number = 1;
  hiTeam: string = "xxx";
  team: string = "All";
  watch: number = 0;
  selectedMatch: number;

  apiWatch1List: Final24[]=[];
  apiWatch2List: Final24[]=[];

  apiMatchList: Matches[];
  apiMatchList_filter: Matches[]; 
  apiCurrTeamList: CurrTeams[];

  teamMatch: TeamMatch[] = [];
  teamMatchFinal: TeamMatch[] = [];
  teamMatchFilter: TeamMatch[] = [];
  teamMatchChange: TeamMatch[] = [];

  teamHi = [""];
  moveTeam: string = "";
  moveMatch: number = 0;

  constructor(private apiService: ApiService, private router: Router) {
    this.isMobile=0;
    this.apiMatchList = [];
    this.apiMatchList_filter = [];
    this.apiCurrTeamList = [];
    this.selectedMatch = 0;

    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });

    this.apiService.CurrTeamReplay.subscribe(currteam => {
      this.apiCurrTeamList = currteam;
    });

    this.apiService.getWatch1().then(response => this.apiWatch1List = response);
    this.apiService.getWatch2().then(response => this.apiWatch2List = response);

  }

  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNo=match;
    this.regenerateFilter();

  }
  teamPage(team: string) {
    console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    if (this.isMobile == 1) {
      this.sendTeamEvent.emit(team);
    } else {
      // Opens in New Tab
      this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); });
    }
  }

  matchPage(match: number) {
    console.log("Calling Match Page with: " + match)
    //this.router.navigateByUrl('/robot/'+team);

    if (this.isMobile == 1) {
      this.sendMatchEvent.emit(match);
    } else {
      // Opens in New Tab
      this.router.navigate([]).then(result => { window.open('#/match/'+match, '_blank'); }); 
    }
   
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


  setWatch(watch: number) {
    this.watch = watch;
    //this.regenerateFilter();
    console.log("Run setWatch: " + watch);
  }


  getClass(team: string, color: string) {
  // Sets the highlight class for the teams on the schedule
    if (team == this.hiTeam) {
      if (color == 'R')
        return 'sortedR';
      else
        return 'sortedB';
    }
    if ((this.watch == 1) || (this.watch == 3)) {
      for (const t of this.apiWatch1List) {
        if (team == t.Team) {
          return 'watch1';
        }
      }
    } 
    if ((this.watch == 2) || (this.watch == 3)) {
      for (const t of this.apiWatch2List) {
        if (team == t.Team) {
          return 'watch2';
        }
      }
    }

    if (color == 'R')
      return 'titleR';
    else
      return 'titleB';

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
      }  /* if (this.watch == 1)
        for (const x of this.apiWatch1List) {
          console.log("Team: " + x.Team);
          this.teamSelect(x.Team);
        } */
        
    } else {
      console.log("No Match List Found");
    }

  }

  teamList() {

    //console.log("Made it to Filter with [" + this.matchNo + "]");
    if (this.apiMatchList) {

      this.teamMatch = [];
      this.teamMatchFinal = [];
      for (const m of this.apiMatchList) {
        this.teamMatch.push({Team: m.RedTeam1, MatchNo: m.MatchNo});
        this.teamMatch.push({Team: m.RedTeam2, MatchNo: m.MatchNo});
        this.teamMatch.push({Team: m.RedTeam3, MatchNo: m.MatchNo});
        this.teamMatch.push({Team: m.BlueTeam1, MatchNo: m.MatchNo});
        this.teamMatch.push({Team: m.BlueTeam2, MatchNo: m.MatchNo});
        this.teamMatch.push({Team: m.BlueTeam3, MatchNo: m.MatchNo});
      }

    } else {
      console.log("No Match List Found");
    }
    
    //Pick by Team
    //this.teamMatch.sort((a, b) => Number(b.Team) - Number(a.Team));
    this.teamMatch.sort((a, b) => Number(a.Team) - Number(b.Team));
    var selectedTeams: any =[];
    var selectedMatches: any =[];

    for (const w of this.teamMatchChange) {
      selectedTeams.push(w.Team);
      selectedMatches.push(w.MatchNo);
      this.teamMatchFinal.push(w);
    }

    for (const c of this.teamMatch) {
      //console.log("Team: " + c.Team + " MatchNo: " + c.MatchNo);
      if (selectedMatches.includes(c.MatchNo)) {
        //console.log("Skipping Match: " + c.MatchNo);
      } else if (selectedTeams.includes(c.Team)) {
          //console.log("Skipping team: " + c.Team);
      } else {
            //console.log("Team List: " + c.Team + " Match: " + c.MatchNo);
            //console.log("Printing Record: " + c.MatchNo + ":" + c.Team);
            this.teamMatchFinal.push(c);
            selectedTeams.push(c.Team);
            selectedMatches.push(c.MatchNo);
      }
    }
    this.teamMatchFinal.sort((a, b) => a.MatchNo - b.MatchNo);

    this.teamMatchFilter = [];
    var i = 1;
    var j = 0;
    for (const x of this.teamMatchFinal) {
      //console.log("---------------------");
      if (x.MatchNo == i) {
        //console.log("Match " + x.MatchNo);
        this.teamMatchFilter.push(x);
        i = i + 1;
      } else {
        j = 0;
        while (i < x.MatchNo) {
          //console.log("Blank Match " + i + " MatchNo: " + x.MatchNo);
          this.teamMatchFilter.push({Team: "", MatchNo: i});
          i = i + 1;
        }
        //console.log("Match " + x.MatchNo);
        this.teamMatchFilter.push(x);
        i = i + 1;
      }
    }

    //console.log("Teams List: " + selectedTeams);

  }


  selectMatch(match: number) {
    this.teamHi = [];
    this.moveMatch = match;
    for (const m of this.apiMatchList) {
      if (m.MatchNo == match)
        {
          this.teamHi.push(m.RedTeam1);
          this.teamHi.push(m.RedTeam2);
          this.teamHi.push(m.RedTeam3);
          this.teamHi.push(m.BlueTeam1);
          this.teamHi.push(m.BlueTeam2);
          this.teamHi.push(m.BlueTeam3);
          break;
        }
    }
    //console.log("Teams for Match " + match + " [" + this.teamHi + "]");
  }

  selectTeam(team: string) {
    this.moveTeam = team;
    this.teamSelect(team);

    //console.log("Team to Hilight: [" + this.moveTeam + "]");
  }

  getTeamClass(team: string) {
    if (this.moveTeam == team) {
      return 'watch1';
    } else if (this.teamHi.includes(team)) {
      return 'watch2';
    } else {
      return 'normal';
    }
  }

  getMatchClass(match: number) {
    if (this.moveMatch == match) {
      return 'watch1';
    } else {
      return 'normal';
    }
  }

  switchTeam(team: string, match: number) {
    if ((this.moveMatch > 0) && (this.moveTeam != "")) {
      this.teamMatchChange.push({Team: this.moveTeam, MatchNo: match});
      this.teamMatchChange.push({Team: team, MatchNo: this.moveMatch});
      console.log("Adding ["+this.moveMatch+":"+team+"] and [" + match + ":" + this.moveTeam +"]");
    }

    this.teamList();

  }

  resetList() {
    this.teamMatchChange =[];
    this.teamList();

  }

  setMatch(ID: number){
    this.selectedMatch = ID;
    console.log(this.selectedMatch);
  }



  ngOnInit(): void {

  }

}
