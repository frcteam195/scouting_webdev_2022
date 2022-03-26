import { Component, OnInit, Input } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';

@Component({
  selector: 'app-robot-info',
  templateUrl: './robot-info.component.html',
  styleUrls: ['./robot-info.component.scss']
})
export class RobotInfoComponent implements OnInit {


  @Input() selectedTeam: string;


  apiAnalysis: CEA[] = [];
  title: String;
  titleShow = true;


  constructor(private apiService: ApiService) {
    this.apiAnalysis = [];
    this.title = "Title";
    this.selectedTeam = "";

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
    });

  }

  /* generateWriteUp(){
    var f: String = "";
    for (let x of this.apiAnalysis){
      if (x.Team == this.selectedTeam){
        console.log('found team');
        if (x.AnalysisTypeID == 46){ //played defense
          if (x.Summary1Value >= .70){
            f += "It plays defense during most matches. ";
          } else if (x.Summary1Value >= .25){
            f += "It plays defense occasionally. ";
          } else if (x.Summary1Value > 0 ){
            f += "It usually does not play defense. ";
          } else if (x.Summary1Value == 0) {
            "It has not played defense. ";
          }
        } 
        if (x.AnalysisTypeID == 11){ //auto score
          if (x.Summary1Value == 0){
            f += "This team has not auto. ";
          } else {
            f += "This robot scores " + x.Summary1Value + " points a match for their auto on average. ";
          }
        }
        if (x.AnalysisTypeID == 30){
          if (x.Summary1Value == 0){
            f += "It does not or vary rarely climbs. ";
          } else if (x.Summary2Value == 4){
            f += "It will usually reach the low bar. ";
          } else if (x.Summary2Value == 6){
            f += "It will usually reach the mid bar. ";
          } else if (x.Summary2Value == 10){
            f += "It will usually reach the high bar. ";
          } else if (x.Summary2Value == 15){
            f += "It will usually reach the traversal bar. ";
          }
        }
        if (x.AnalysisTypeID == 47 && x.Summary1Value > 0){
          f += "It has lost comms before. ";
        }
        if (x.AnalysisTypeID == 48 && x.Summary1Value > 0){
          f += "It has broke a sub system before. ";
        }
        if (x.AnalysisTypeID == 49 && x.Summary1Value > 0){
          f += "It has broke down before. ";
        }
      }
    }
    if (f == ""){
      return "Error, team not found!";
    } else {
      return f;
    }
  } */

  ngOnInit(): void {
    //console.log("ngOnInit: Team Passed to Component: " + this.selectedTeam);
    //this.regenerateFilter();
  }

  

}
