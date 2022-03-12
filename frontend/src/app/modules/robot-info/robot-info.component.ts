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

  ngOnInit(): void {
    //console.log("ngOnInit: Team Passed to Component: " + this.selectedTeam);
    //this.regenerateFilter();
  }

  

}
