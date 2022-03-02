import { SelectorMatcher } from '@angular/compiler';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
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

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  title: String;

  constructor(private apiService: ApiService) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.teamList = [];
    this.sort = 1;

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
  }

  localSort(type: number) {
    console.log("Local Sort Type: " + type)
    this.sort = type;
    this.regenerateFilter();
  }

  teamPage(team: string) {
    console.log("Calling Robot Page with: " + team)
    window.open("/robot/"+team);
  }

  teamSelect(team: string) {
    console.log("Highlighting Robot: " + team)
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

      this.title = this.apiAnalysis_filter[0].AnalysisType;

    } else {
      this.apiAnalysis_filter = [];
    }

  }

}
