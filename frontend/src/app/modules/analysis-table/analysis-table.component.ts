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
  url: string = "";


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
        analysisTypes = [1,10,11,20,21,22,30,60,61,62]; // temp added 60,61,62,70
      } else if (this.analysisGroup == 2) {
        analysisTypes = [40,41,42,43,44,45,46,47,48,49];
      } else if (this.analysisGroup == 3) {
        analysisTypes = [1,10,11,20,21,22,30,60,61,62];
      } else {
        analysisTypes = [70,71];
      }

      if (this.color > 0) {
        this.titleShow = false;
      }

      //console.log("Analysis Count: [" + analysisTypes.length + "]");

      // Filter
      var url;
      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.Team == this.selectedTeam) {
          if (analysisTypes.includes(cea.AnalysisTypeID)) {
            
            if (cea.AnalysisTypeID == 70 ) {
             //messageText = "<a href='http://www.google.com'>Open Google</a>"
             //this.url = "<a href='http://www.google.com'>Open Google</a>";
             //url = "<a href='C:/ck/video/"+cea.Match1Display+".mp4'>"+cea.Match1Display+"</a>";
              //cea.Match4Display = this.url;
            }
            
            this.apiAnalysis_filter.push(cea);
          }
         }
       } 
    } else {
      this.apiAnalysis_filter = [];
    }
  }

}