import { Component, OnInit, Input } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';

@Component({
  selector: 'app-analysis-table',
  templateUrl: './analysis-table.component.html',
  styleUrls: ['./analysis-table.component.scss']
})
export class AnalysisTableComponent implements OnInit {


  @Input() selectedTeam: string;
  @Input() analysisGroup: number;
  @Input() color: number;


  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  title: String;
  titleShow = true;


  constructor(private apiService: ApiService) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.selectedTeam = "";
    this.analysisGroup = 0;
    this.color = 0;

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });

  }

  ngOnInit(): void {
    //console.log("ngOnInit: Team Passed to Component: " + this.selectedTeam);
    //this.regenerateFilter();
  }

  ngOnChanges() {
    this.regenerateFilter();
  }


  regenerateFilter() {
    //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);

    if (this.apiAnalysis) {

      this.apiAnalysis_filter = [];
      let analysisTypes = [];

      if (this.analysisGroup == 1) {
        analysisTypes = [1,10,11,20,21,22,30,60,61,62,70]; // temp added 60,61,62,70
      } else {
        analysisTypes = [40,41,42,43,44,45,46,47,48,49];
      }

      if (this.color > 0) {
        this.titleShow = false;
      }

      //console.log("Analysis Count: [" + analysisTypes.length + "]");

      // Filter
      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.Team == this.selectedTeam) {
          if (analysisTypes.includes(cea.AnalysisTypeID)) {
            this.apiAnalysis_filter.push(cea);
          }
         }
       } 
    } else {
      this.apiAnalysis_filter = [];
    }
  }

}