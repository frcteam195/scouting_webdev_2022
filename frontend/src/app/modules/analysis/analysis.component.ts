import { Component, OnInit } from '@angular/core';
import { ApiService, CEA, Final24 } from '../../services/api.service';
import CeaJson from '../../cea.json';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  //Analysis: CEA[] = CeaJson;
  analysisTypeID: number;
  analysis1: number = 10;
  analysis2: number = 11;
  type: number = 1;

  //apiAnalysis: CEA[] = [];
  apiFinal24List: Final24[] = [];  

  constructor(private apiService: ApiService) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    this.apiService.Final24Replay.subscribe((final24) => (this.apiFinal24List = final24));
    this.analysisTypeID = 1;
  }

  changeDisplay(type: number) {
    console.log("Display Type: " + type)
    if (type == 1) {
      this.analysis1 = 10;
      this.analysis2 = 11;
    } else if (type == 2) {
      this.analysis1 = 20;
      this.analysis2 = 21;
    } else if (type == 3) {
      this.analysis1 = 60;
      this.analysis2 = 61; 
    } else if (type == 4) {
      this.analysis1 = 60;
      this.analysis2 = 30; 
    } else {
       this.analysis1 = 10;
       this.analysis2 = 11;
    }
    console.log("Left Table: " + this.analysis1 + ", Right Table: " + this.analysis2 );

  }

  ngOnInit(): void {

  }

}
