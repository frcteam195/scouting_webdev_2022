import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Summary, Final24 } from 'src/app/services/api.service';

@Component({
  selector: 'app-summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.scss']
})
export class SummaryGraphComponent implements OnInit {

  @Input() teamList: Final24[];
  @Input() filter: number;

  apiSummary: Summary[] = []
  apiSummary_filter: Summary[] = [];
  title: string;
  team: string;
  graphData: any[];
  fFlag: string;


  public graph = {
    data: [{ x: ["195","230","181"], y: [4,3,2], type: 'bar', name: 'Auto'},
    { x: ["195","230","181"], y: [32,21,18], type: 'bar', name: 'Tele'},
    { x: ["195","230","181"], y: [15,15,10], type: 'bar', name: 'Climb'}],
    layout: {width: 1000, height: 360, barmode: 'stack', xaxis: { type: 'category' }, title: 'Summary Graph'}
  };

  selectedTeam: string;

  chartOptions: { series: { name: string; data: number[]; }[]; chart: { type: string; height: number; stacked: boolean; toolbar: { show: boolean; }; zoom: { enabled: boolean; }; }; responsive: { breakpoint: number; options: { legend: { position: string; offsetX: number; offsetY: number; }; }; }[]; plotOptions: { bar: { horizontal: boolean; }; }; xaxis: { type: string; categories: string[]; }; legend: { position: string; offsetY: number; }; fill: { opacity: number; }; } | undefined;

  constructor(private apiService: ApiService) {    

    this.apiSummary_filter = [];
    this.apiSummary = [];
    this.title = "Title";
    this.selectedTeam = "";
    this.team = "195";
    this.graphData = [];
    this.fFlag="N"
    this.teamList = [];
    this.filter = 0;

    // Update the filter whenever the inputting data changes
      this.apiService.SummaryReplay.subscribe(summary => {
      this.apiSummary = summary;
      this.regenerateFilter();
    });
  }

  ngOnChanges() {
    this.regenerateFilter();
  }
  
    
    regenerateFilter() {
      //console.log("regenerateFilter: Analysis Passed to Component: " + this.selectedTeam);
     
    if (this.apiSummary) {

      this.apiSummary_filter = this.apiSummary;

      this.graphData = [];

      let robotList = [];
      let autoList = []; //autonomous mean
      let ballsList = []; //total balls mean
      let scoreList = []; //total score mean
      let climbList = []; //climb mean
      let upperList = []; //tele upper balls
      let lowerList = []; //tele lower balls
      let totalList = []; //tele total balls

      let rcount = 0;
      for (const t of this.apiSummary_filter)
      {
        rcount = 0;   // set count to 0
        this.fFlag = "N";
        for (const team of this.teamList) {

          if (t.Team == team.Team) {
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
        if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {

            robotList.push(t.Team);
            autoList.push(t.AutonomousMean);
            ballsList.push(t.TotalBallsMean)
            scoreList.push(t.TotalScoreMean)
            climbList.push(t.ClimbMean)
            upperList.push(t.TeleHighBallsMean)
            lowerList.push(t.TeleLowBallsMean)
            totalList.push(t.TeleTotalBallsMean)
            
        }
      }

        this.graphData.push({
          x: robotList,
          y: autoList,
          type: 'bar',
          name: 'Auto',
          marker: {color: '#0000ff'}
        });
        this.graphData.push({
          x: robotList,
          y: ballsList,
          type: 'bar',
          name: 'Total Balls',
          marker: {color: '#5630ff'}
        });
        this.graphData.push({
          x: robotList,
          y: scoreList,
          type: 'bar',
          name: 'Total Score',
          marker: {color: '#7a4efe'}
        });
        this.graphData.push({
          x: robotList,
          y: climbList,
          type: 'bar',
          name: 'Climb',
          marker: {color: '#9569fd'}          
        });
        this.graphData.push({
          x: robotList,
          y: upperList,
          type: 'bar',
          name: 'Tele High',
          marker: {color: '#ab84fc'}
        });
        this.graphData.push({
          x: robotList,
          y: lowerList,
          type: 'bar',
          name: 'Tele Lower',
          marker: {color: '#bf9efa'}
        });
        this.graphData.push({
          x: robotList,
          y: totalList,
          type: 'bar',
          name: 'Tele Total',
          marker: {color: '#d1b9f8'}
        });

        this.graph = {
        data: this.graphData,
        layout: {width: 1000, height: 600, barmode: 'stack', xaxis: { type: 'category' }, title: 'Summary Graph'}
        };
      }
      
    } 
 
  
ngOnInit(): void {
  }

}