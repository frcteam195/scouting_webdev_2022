import { Component, OnInit } from '@angular/core';
import { ApiService, Summary } from 'src/app/services/api.service';

@Component({
  selector: 'app-summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.scss']
})
export class SummaryGraphComponent implements OnInit {

  apiSummary: Summary[] = []
  apiSummary_filter: Summary[] = [];
  title: string;
  team: string;
  analysisType: string;
  graphData: any[];


  public graph = {
    data: [    { x: [], y: [], type: 'bar', name: '195'}],
    layout: {width: 640, height: 480, title: '195'}
  };

  selectedTeam: string;
  analysisTypeID: number;

  chartOptions: { series: { name: string; data: number[]; }[]; chart: { type: string; height: number; stacked: boolean; toolbar: { show: boolean; }; zoom: { enabled: boolean; }; }; responsive: { breakpoint: number; options: { legend: { position: string; offsetX: number; offsetY: number; }; }; }[]; plotOptions: { bar: { horizontal: boolean; }; }; xaxis: { type: string; categories: string[]; }; legend: { position: string; offsetY: number; }; fill: { opacity: number; }; } | undefined;

  constructor(private apiService: ApiService) {    

    this.apiSummary_filter = [];
    this.apiSummary = [];
    this.title = "Title";
    this.selectedTeam = "";
    this.analysisTypeID = 0;
    this.team = "195";
    this.analysisType = "";
    this.graphData = [];

    // Update the filter whenever the inputting data changes
      this.apiService.SummaryReplay.subscribe(summary => {
      this.apiSummary = summary;
      this.regenerateFilter();
    });
  }

  
    
    regenerateFilter() {
      //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);
     
    if (this.apiSummary) {

      this.apiSummary_filter = [];
      let teamList = [];

      let autoList = []; //autonomous mean
      let ballsList = []; //total balls mean
      let scoreList = []; //total score mean
      let climbList = []; //climb mean
      let upperList = []; //tele upper balls
      let lowerList = []; //tele lower balls
      let totalList = []; //tele total balls

      for (const t of this.apiSummary)
      {

          teamList.push(t.Team);

          autoList.push(t.AutonomousMean);
          ballsList.push(t.TotalBallsMean)
          scoreList.push(t.TotalSCoreMean)
          climbList.push(t.ClimbMean)
          upperList.push(t.TeleHighBallsMean)
          lowerList.push(t.TeleLowBallsMean)
          totalList.push(t.TeleTotalBallsMean)
          
          this.analysisType = t.AnalysisType;
        }
        
        console.log("Total Balls: ",  ballsList);

        var trace1 = {
          x: [teamList],
          y: [autoList],
          name: 'Autonomous Mean',
          type: 'bar'
        };
        var trace2 = {
          x: [teamList],
          y: [ballsList],
          name: 'Auto Total Balls Mean',
          type: 'bar'
        };
        var trace3 = {
          x: [teamList],
          y: [scoreList],
          name: 'Auto Total Score Mean',
          type: 'bar'
        };
        var trace4 = {
          x: [teamList],
          y: [climbList],
          name: 'Auto Score Mean',
          type: 'bar'
        };
        var trace5 = {
          x: [teamList],
          y: [upperList],
          name: 'Tele Upper Ball Mean',
          type: 'bar'
        };
        var trace6 = {
          x: [teamList],
          y: [lowerList],
          name: 'Tele Lower Ball Mean',
          type: 'bar'
        };
        var trace7 = {
          x: [teamList],
          y: [totalList],
          name: 'Tele Total Ball Mean',
          type: 'bar'
        };

//[trace1, trace2, trace3, trace4, trace5, trace6, trace7],
        this.graphData.push(trace1);
        this.graphData.push(trace2);
        this.graphData.push(trace3);
        this.graphData.push(trace4);
        this.graphData.push(trace5);
        this.graphData.push(trace6);
        this.graphData.push(trace7);

        this.graph = {
        data: this.graphData,
        layout: {width: 1000, height: 360, title: this.analysisType}
        //layout: {barmode: 'stack'}
        };


        /*this.chartOptions = {


          

         
          


          series: [
            {
              name: "Auto Mean",
              data: autoList
            },
            {
              name: "Total Balls Mean",
              data: ballsList
            },
            {
              name: "Total Score Mean",
              data: scoreList
            },
            {
              name: "Climb Mean",
              data: climbList
            },
            {
              name: "Tele High Balls Mean",
              data: upperList
            },
            {
              name: "Tele Bottom Balls Mean",
              data: lowerList
            },
            {
              name: "Tele Total Balls Mean",
              data: totalList
            }
            
          ],
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
    
          xaxis: {
            type: "category",
            categories:  teamList
          },
          legend: {
            position: "right",
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        }; */
      }
      
    } 
    /*else 
    {
      this.apiAnalysis_filter = [];
   }*/   
  
  
ngOnInit(): void {
  }

}