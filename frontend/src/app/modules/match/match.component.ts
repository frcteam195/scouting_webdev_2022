import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';
import { Matches } from '../../matches';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

 redTeam1: string = "195";
 redTeam2: string = "195";
 redTeam3: string = "195";
 blueTeam1: string = "195";
 blueTeam2: string = "195";
 blueTeam3: string = "195";
 matchNo: number = 1;
 matchString: string = "";
 redTeleScore: number = 999;
 blueTeleScore: number = 999;
 redAutoScore: number = 999;
 blueAutoScore: number = 999;
 redClimbScore: number = 999;
 blueClimbScore: number = 999;
 redTotalScore: number = 999;
 blueTotalScore: number = 999;
 matchOutcome: string = "";

  //apiAnalysis: CEA[] = [];
  apiMatchList: Matches[] = []; 
  apiAnalysis_filter: CEA[] = [];
  apiAnalysis: CEA[] = []; 

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
      this.regenerateFilter();
    });
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateAnalysisFilter(this.redTeam1);
    });
  }

  getTeleScore(team: String){
    this.regenerateAnalysisFilter(team);
    for (let a of this.apiAnalysis_filter) {
    if (a.AnalysisTypeID == 62 && a.Team == team){
        return a.Summary1Value;
      }
    }
    return 999;
  }

  getAutoScore(team: String){
    this.regenerateAnalysisFilter(team);
    for (let a of this.apiAnalysis_filter) {
    if (a.AnalysisTypeID == 11 && a.Team == team){
        return a.Summary1Value;
      }
    }
    return 999;
  }

  getClimbScore(team: String){
    this.regenerateAnalysisFilter(team);
    for (let a of this.apiAnalysis_filter) {
    if (a.AnalysisTypeID == 30 && a.Team == team){
        return a.Summary1Value;
      }
    }
    return 999;
  }

  getTotalScore(team: String){
    this.regenerateAnalysisFilter(team);
    for (let a of this.apiAnalysis_filter) {
    if (a.AnalysisTypeID == 61 && a.Team == team){
        return a.Summary1Value;
      }
    }
    return 999;
  }

  getMatch(match: number) {
    //console.log("Made it to getMatch with [" + match + "]");
    this.matchNo=match;
    this.regenerateFilter();

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
    //Assign values to score totals
    this.redTeleScore = Math.round((this.getTeleScore(this.redTeam1) + this.getTeleScore(this.redTeam2) + this.getTeleScore(this.redTeam3)) * 10)/10;
    this.blueTeleScore = Math.round((this.getTeleScore(this.blueTeam1) + this.getTeleScore(this.blueTeam2) + this.getTeleScore(this.blueTeam3)) * 10)/10;
    this.redAutoScore = Math.round((this.getAutoScore(this.redTeam1) + this.getAutoScore(this.redTeam2) + this.getAutoScore(this.redTeam3))*10)/10;
    if (this.redAutoScore > 38){ //Account for the fact that the maximum amount teams can score in auto is 38. 8 tele high and 3 taxi = 8*4 + 2*3 = 38 total points
      this.redAutoScore = 38;
    }
    this.blueAutoScore = Math.round((this.getAutoScore(this.blueTeam1) + this.getAutoScore(this.blueTeam2) + this.getAutoScore(this.blueTeam3))*10)/10;
    if (this.blueAutoScore > 38){
      this.blueAutoScore = 38;
    }
    this.redClimbScore = Math.round((this.getClimbScore(this.redTeam1) + this.getClimbScore(this.redTeam2) + this.getClimbScore(this.redTeam3))*10)/10;
    this.blueClimbScore = Math.round((this.getClimbScore(this.blueTeam1) + this.getClimbScore(this.blueTeam2) + this.getClimbScore(this.blueTeam3))*10)/10;
    this.redTotalScore = Math.round((this.getTotalScore(this.redTeam1) + this.getTotalScore(this.redTeam2) + this.getTotalScore(this.redTeam3))*10)/10;
    this.blueTotalScore = Math.round((this.getTotalScore(this.blueTeam1) + this.getTotalScore(this.blueTeam2) + this.getTotalScore(this.blueTeam3))*10)/10;
    if (this.blueTotalScore > this.redTotalScore){
      this.matchOutcome = "Blue Alliance Victory";
    } else if (this.redTotalScore > this.blueTotalScore){
      this.matchOutcome = "Red Alliance Victory";
    } else {
      this.matchOutcome = "Draw";
    }
  }

  regenerateAnalysisFilter(team: String) {
    //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);

    if (this.apiAnalysis) {

      this.apiAnalysis_filter = [];

      // Filter
      var url;
      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.Team == team) {
          
            this.apiAnalysis_filter.push(cea);
          
         }
       } 
    } else {
      this.apiAnalysis_filter = [];
    }
  }

  ngOnInit(): void {

    this.matchNo = Number(this.route.snapshot.paramMap.get('match')|| '1');
    //this.matchNo = Number(this.matchString);
    console.log("Check Match: " + this.matchNo)
  }

}
