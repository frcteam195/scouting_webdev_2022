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
  @Input() graphSize: number;
  

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  title: string;
  team: string;
  analysisType: string;
  graphData: any[];
  public graph = {
    data: [    { x: [], y: [],  }    ],
    layout: {width: 640, height: 480, title: "", margin: {b:0, l:0, r:0, t:0}}
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
    this.graphSize = 1;

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

    //console.log("Analysis Type ID: " + this.analysisTypeID);
    //console.log("Selected Team: " + this.selectedTeam);

    // Set Graph Length and Width
    let gWidth = 640;
    let gHeight = 480;
    if (this.graphSize == 1)
    {
      gWidth = 240;
      gHeight = 120;
    }


    if (this.apiAnalysis) {

      this.graphData = [];
      this.apiAnalysis_filter = [];
      for (const cea of this.apiAnalysis)
      {
        if (cea.AnalysisTypeID == this.analysisTypeID) 
        {
          
          let yValueList = [];
          let xValueList = [];
          let color = '#CCCCCC';

          this.team = cea.Team;
          this.analysisType = cea.AnalysisType;
          
          if (this.team == this.selectedTeam) {
            color = '#0000FF';
          }

          xValueList.push(this.analysisType);
          yValueList.push(cea.Summary2Value);
          
          

          this.graphData.push({
            x: xValueList,
            y: yValueList,
            text: yValueList.map(String),
            type: "bar",
            marker: { color: color },
            showlegend: false,
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
/*       layout: {width: 640, height: 480, title: this.analysisType} */
      layout: {width: gWidth, height: gHeight, title: " ", margin: {b:20, l:20, r:20, t:20}},
    };
  }

}


