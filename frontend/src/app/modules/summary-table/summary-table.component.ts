import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Final24, Summary } from 'src/app/services/api.service';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss']
})
export class SummaryTableComponent implements OnInit {

  @Input() teamList: Final24[];
  @Input() sort: Number;
  @Input() focus: string;
  @Input() filter: number;

  @Output() sendTeamEvent = new EventEmitter<string>();

  apiSummary: Summary[] = []
  apiSummary_filter: Summary[] = [];
  title: string;
  team: string;
  graphData: any[];
  fFlag: string;
  sortType: number;


  selectedTeam: string;

  constructor(private apiService: ApiService, private router: Router) {    

    this.apiSummary_filter = [];
    this.apiSummary = [];
    this.selectedTeam = "";
    this.team = "";
    this.graphData = [];
    this.fFlag="N"
    this.teamList = [];
    this.filter = 0;
    this.sortType = 1;
    this.title = "Summary Graph Median";
    this.sort = 1;
    this.focus = "";

    // Update the filter whenever the inputting data changes
      this.apiService.SummaryReplay.subscribe(summary => {
      this.apiSummary = summary;
      this.regenerateFilter();
    });
  }

  changeSort(view: number) {
    if (view == 1) {
      this.sortType = 2;
      this.title = "Summary Graph Mean"
    } else {
      this.sortType = 1;
      this.title = "Summary Graph Median"
    }
    this.regenerateFilter();
  }

  ngOnChanges() {
    this.regenerateFilter();
    this.teamSelect(this.focus);
  }
  

  localSort(type: number) {
    //console.log("Local Sort Type: " + type)
    this.sort = type;
    this.regenerateFilter();
  }

  teamPage(team: string) {
    //console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  teamSelect(team: string) {
    //console.log("Current Team: " + this.team);
    if (team == this.team) {
        //this.team = "";
        //console.log("Highlight off");
    } else {
      this.team = team;
      //console.log("Highlighting Robot: " + team);
    }
    
    // Send team back to parent component
    this.sendTeamEvent.emit(this.team);
    
  }


  
  regenerateFilter() {
    //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);
    
  if (this.apiSummary) {

    this.apiSummary_filter = [];
    
    let rcount = 0;
    for (const summ of this.apiSummary)
    {
      rcount = 0;   // set count to 0
      this.fFlag = "N";
      for (const team of this.teamList) {
        //console.log("cea.Team: [" + cea.Team + "] Team: [" + team.Team + "]");
        if (summ.Team == team.Team) {
          if (this.filter == 0) {
            rcount = rcount+1;// increment count
            //console.log("Don't Pick Team: " + team.Team);
            break;
          } else {
            //console.log("Pick Team: " + team.Team);
            this.fFlag = "Y";
          }
        }
      }
      if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {
          //console.log("Print Record for: "+summ.Team);
          this.apiSummary_filter.push(summ);
      }
    }
    
      // Sort Logic
      if (this.sort == 1)  {
        //Total Score Sort
        this.apiSummary_filter.sort((a, b) => b.TotalScoreMedian - a.TotalScoreMedian);
      } else if (this.sort == 2) {
        //Sort by Team Number
        this.apiSummary_filter.sort((a, b) => Number(a.Team) - Number(b.Team));
      } else if (this.sort == 3) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.AutonomousMedian - a.AutonomousMedian);
      } else if (this.sort == 4) {
        //Sort by Auto Score
        this.apiSummary_filter.sort((a, b) => b.AutonomousScoreMedian - a.AutonomousScoreMedian);
      } else if (this.sort == 5) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.TeleLowBallsMedian - a.TeleLowBallsMedian);
      } else if (this.sort == 6) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.TeleHighBallsMedian - a.TeleHighBallsMedian);
      } else if (this.sort == 7) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.TeleTotalBallsMedian - a.TeleTotalBallsMedian);
      } else if (this.sort == 8) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.TeleBallScoreMedian - a.TeleBallScoreMedian);
      } else if (this.sort == 9) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.TotalBallsMedian - a.TotalBallsMedian);
      } else if (this.sort == 10) {
        //Sort by Auto
        this.apiSummary_filter.sort((a, b) => b.ClimbMedian - a.ClimbMedian);
      } 

    } else {
      this.apiSummary_filter = [];
    }
    
  } 

  
ngOnInit(): void {
  }

}