import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';
import { Types } from 'src/app/types';

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
  apiTypes: Types[] = [];
  title: String;
  titleShow = true;
  url: string = "";


  constructor(private apiService: ApiService, private router: Router) {
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
    this.apiService.TypesReplay.subscribe(types => {
      this.apiTypes = types;
    });

  }

  ngOnInit(): void {
    //console.log("ngOnInit: Team Passed to Component: " + this.selectedTeam);
    //this.regenerateFilter();
  }

  ngOnChanges() {
    this.regenerateFilter();
  }

  teamPage(team: string) {
    //console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  regenerateFilter() {
    //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);

    if (this.apiAnalysis) {

      this.apiAnalysis_filter = [];
      let analysisTypes = [];

      

      if (this.analysisGroup == 1) {
        analysisTypes = [10,11,20,21,22,30,46,61]; // Match Report
      } else if (this.analysisGroup == 2) {
        analysisTypes = [40,41,42,43,44,45,46,47,48,49,50];  // Robot Snapshot Middle
      } else if (this.analysisGroup == 3) {
        analysisTypes = [1,2,3,10,11,12,20,21,22,30,60,61,62,72];  // Robot Snapshot Top
      } else if (this.analysisGroup == 4) {
        analysisTypes = [73,74,75];  // Robot Snapshot Blue
      } else {
        analysisTypes = [70,71];   // Robot Snapshot Bottom
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