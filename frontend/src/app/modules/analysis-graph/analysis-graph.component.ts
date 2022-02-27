import { Component, Input, OnInit } from '@angular/core';
import { CEA } from 'src/app/CEA';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-analysis-graph',
  templateUrl: './analysis-graph.component.html',
  styleUrls: ['./analysis-graph.component.scss']
})
export class AnalysisGraphComponent implements OnInit {

  @Input() selectedTeam: string;
  @Input() analysisTypeID: number;
  

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  title: string;
  team: string;
  analysisType: string;
  graphData: any[];
  public graph = {
    data: [    { x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [2,3,8,5,6,4,8], type: 'line', name: "195", mode: 'lines+points', marker: {color: 'red'} },
    { x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [2, 5, 3], type: 'line', name: 'Hello'},
    ],
    layout: {width: 640, height: 480, title: 'A Fancy Plot'}
  };

  constructor(private apiService: ApiService) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.selectedTeam = "";
    this.analysisTypeID = 0;
    this.team = "195";
    this.analysisType = "";
    this.graphData = [];

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

    console.log("Analysis Type ID: " + this.analysisTypeID);

    if (this.apiAnalysis) {

      this.apiAnalysis_filter = [];
      let xValueList = [1];
      for (const cea of this.apiAnalysis)
      {
        if (cea.AnalysisTypeID == this.analysisTypeID) 
        {
          let yValueList = [];
          this.team = cea.Team;

          yValueList.push(cea.Summary2Value);
          
          this.analysisType = cea.AnalysisType;

          this.graphData.push({
            x: xValueList,
            y: yValueList,
            type: "bar",
            showlegend: true,
            name: this.team
          });
        }
      }
    } else 
    {
      this.apiAnalysis_filter = [];
    }

    this.graphData.sort((a, b) => b.y - a.y);

    this.graph = {
      data: this.graphData,
      layout: {width: 640, height: 480, title: this.analysisType}
    };
  }

}


