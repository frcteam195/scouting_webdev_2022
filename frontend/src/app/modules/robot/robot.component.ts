import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {


  analysisGroup: number = 2;
  selectedTeam: string ;

  constructor() {
    this.selectedTeam="";
   }

  ngOnInit(): void {
  }

}
