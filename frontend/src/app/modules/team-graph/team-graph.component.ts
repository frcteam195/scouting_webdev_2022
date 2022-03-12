import { ApiService, CEA, Final24 } from './../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-team-graph',
  templateUrl: './team-graph.component.html',
  styleUrls: ['./team-graph.component.scss']
})
export class TeamGraphComponent implements OnInit {

  @Input() teamList: Final24[];
  @Input() analysisTypeID: Number | undefined;
  @Input() filter: number;

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];

  analysisType: string;
  team: string;
  match: number[];
  graphData: any[];

  team1 = "195";
  fFlag: string;


  public graph = {
    data: [    { x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [2,3,8,5,6,4,8], type: 'line', name: this.team1, mode: 'lines+points', marker: {color: 'red'} },
    { x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [2, 5, 3], type: 'line', name: 'Hello'},
    ],
    layout: {width: 640, height: 480, title: 'A Fancy Plot'}
  };



  constructor(private apiService: ApiService) {
    this.analysisTypeID=2;
    this.team="";
    this.teamList = [];
    this.match = [];
    this.graphData = [];
    this.analysisType = "";
    this.filter = 0;
    this.fFlag = "N";

   }

  ngOnInit(): void {

        // Update the filter whenever the inputting data changes
        this.apiService.CEAReplay.subscribe(analysis => {
          this.apiAnalysis = analysis;
          this.regenerateFilter();
        });
  }

  ngOnChanges() {
    this.regenerateFilter();
  }

  regenerateFilter() {
    //console.log("Analysis Passed to Component: " + this.analysisTypeID);

    if (this.apiAnalysis && this.apiAnalysis.length) {

      this.apiAnalysis_filter = [];
      this.graphData = [];

      let rcount = 0;
      let xValueList = [1,2,3,4,5,6,7,8,9,10,11,12];
      for (const cea of this.apiAnalysis){
        if (cea.AnalysisTypeID == this.analysisTypeID) {
          rcount = 0;   // set count to 0
          this.fFlag = "N";
          for (const team of this.teamList) {

            if (cea.Team == team.Team) {
              if (this.filter == 0) {
                rcount = rcount+1;// increment count
                //team.Team = "";
                break;
              } else {
                //this.apiAnalysis_filter.push(cea);
                this.fFlag = "Y";
              }
            }
          }
          let yValueList = [];
          // if count is still 0, write record if filter value is off
          // if fFlag is Y, write record if filter value is on
          if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {
            this.team = cea.Team;

            yValueList.push(cea.Match1Value);
            yValueList.push(cea.Match2Value);
            yValueList.push(cea.Match3Value);
            yValueList.push(cea.Match4Value);
            yValueList.push(cea.Match5Value);
            yValueList.push(cea.Match6Value);
            yValueList.push(cea.Match7Value);
            yValueList.push(cea.Match8Value);
            yValueList.push(cea.Match9Value);
            yValueList.push(cea.Match10Value);
            yValueList.push(cea.Match11Value);
            yValueList.push(cea.Match12Value);

            this.analysisType = cea.AnalysisType;

            this.graphData.push({
              x: xValueList,
              y: yValueList,
              type: "line",
              showlegend: true,
              //visible: "legendonly",
              name: this.team
            });

          }
        }
      }

    } else {
      this.apiAnalysis_filter = [];
    }



    this.graph = {
      data: this.graphData,
      layout: {width: 1000, height: 360, title: this.analysisType}
    };

  }


}
