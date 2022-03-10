import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, CEA } from 'src/app/services/api.service';
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

  //apiAnalysis: CEA[] = [];
  apiMatchList: Matches[] = [];  

  constructor(private apiService: ApiService, private router: Router) {
    this.isOdd=0;
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

  regenerateFilter() {

    //console.log("Made it to Filter with [" + this.matchNo + "]");
    if (this.apiMatchList) {
      for (const m of this.apiMatchList) {
        //console.log("Match: [" + m.MatchNo + "], selected: [" + this.match + "]");
        if (m.MatchNo == this.matchNo) {
          this.redTeam1 = m.RedTeam1;
          this.redTeam2 = m.RedTeam2;
          this.redTeam3 = m.RedTeam3;
          this.blueTeam1 = m.BlueTeam1;
          this.blueTeam2 = m.BlueTeam2;
          this.blueTeam3 = m.BlueTeam3;
          break;
        }
      }
    } else {
      console.log("Match List Not Found");
    }

  }

  ngOnInit(): void {
    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });
  }

}
