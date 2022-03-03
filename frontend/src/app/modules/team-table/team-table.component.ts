import { Router } from '@angular/router';
import { SelectorMatcher } from '@angular/compiler';
import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { ApiService, CEA, Final24} from '../../services/api.service'


@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit, OnChanges {

  @Input() teamList: Final24[];
  @Input() analysisTypeID: Number | undefined;
  @Input() sort: Number;
  @Input() focus: string;

  @Output() sendTeamEvent = new EventEmitter<string>();

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  title: String;
  team: string;


  constructor(private apiService: ApiService, private router: Router) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.teamList = [];
    this.sort = 1;
    this.team = "";
    this.focus = "999";

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });

  }

  ngOnInit(): void {
    console.log("Analysis Passed to Component: " + this.analysisTypeID);
  }

  ngOnChanges() {
    this.regenerateFilter();
    this.teamSelect(this.focus);
  }

  localSort(type: number) {
    console.log("Local Sort Type: " + type)
    this.sort = type;
    this.regenerateFilter();
  }

  teamPage(team: string) {
    console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  teamSelect(team: string) {
    //console.log("Current Team: " + this.team);
    if (team == this.team) {
        //this.team = "";
        console.log("Highlight off");
    } else {
      this.team = team;
      console.log("Highlighting Robot: " + team);
    }
    
    // Send team back to parent component
    this.sendTeamEvent.emit(this.team);
    
  }

  regenerateFilter() {
    console.log("Analysis Passed to Component: " + this.analysisTypeID);

    if (this.apiAnalysis && this.apiAnalysis.length && this.teamList && this.teamList.length) {

      this.apiAnalysis_filter = [];

      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.AnalysisTypeID == this.analysisTypeID) {
          rcount = 0;   // set count to 0
          for (const team of this.teamList) {
            //console.log("cea.Team: [" + cea.Team + "] Team: [" + team.Team + "]");
            if (cea.Team == team.Team) {
              rcount = rcount+1;// increment count
              //team.Team = "";
              break;
            }
          }
          // if count is still 0, write record
          if (rcount == 0) {
            this.apiAnalysis_filter.push(cea);
            this.title = cea.AnalysisType;
          }
        }
      }
      // Sort Logic
      if (this.sort == 1)  {
        this.apiAnalysis_filter.sort((a, b) => b.Summary1Value - a.Summary1Value);
      } else {
        //this.apiAnalysis_filter.sort((a, b) => (a.Team > b.Team) ? 1 : -1);
        this.apiAnalysis_filter.sort((a, b) => Number(a.Team) -Number(b.Team));
      }

    } else {
      this.apiAnalysis_filter = [];
    }

  }

}
