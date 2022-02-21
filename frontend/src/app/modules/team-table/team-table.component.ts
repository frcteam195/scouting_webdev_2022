import { SelectorMatcher } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService, CEA, Final24} from '../../services/api.service'


@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {

  @Input() teamList: Final24[];
  @Input() analysisTypeID: Number | undefined;


  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  title: String;

  constructor(private apiService: ApiService) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.teamList = [];

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });

  }

  ngOnInit(): void {
    console.log("Analysis Passed to Component: " + this.analysisTypeID);
    //this.regenerateFilter();
  }

  ngOnChanges() {
    this.regenerateFilter();
  }


  regenerateFilter() {
    console.log("Analysis Passed to Component: " + this.analysisTypeID);

    if (this.apiAnalysis) {
      // Filter 1
/*       this.apiAnalysis_filter = this.apiAnalysis.filter(res => {
        return res.AnalysisTypeID == this.analysisTypeID
      }); */
      this.apiAnalysis_filter = [];
      // Filter 2
/*       for (const cea of this.apiAnalysis){
        console.log("Analysis Types: [" + cea.AnalysisTypeID + "],[" + this.analysisTypeID + "]")
        if (cea.AnalysisTypeID == this.analysisTypeID) {
          console.log("Match: " + this.apiAnalysis_filter.length);
          this.apiAnalysis_filter.push(cea);
          
        }
      } */
      // New Filter
      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.AnalysisTypeID == this.analysisTypeID) {
          rcount = 0;   // set count to 0
          for (const team of this.teamList) {
            console.log("cea.Team: [" + cea.Team + "] Team: [" + team.Team + "]");
            if (cea.Team == team.Team) {
              rcount=rcount+1;// increament count
              console.log("Match");
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

      this.title = this.apiAnalysis_filter[0].AnalysisType;

    } else {
      this.apiAnalysis_filter = [];
    }

    for (let t of this.teamList) {
      console.log("team: " + t.Team);
  }
  }

}