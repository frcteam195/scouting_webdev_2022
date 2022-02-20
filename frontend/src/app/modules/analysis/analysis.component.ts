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


  //apiAnalysis: CEA[] = [];
  apiFinal24List: Final24[] = [];  

  constructor(private apiService: ApiService) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));

    this.apiService.Final24Replay.subscribe((final24) => (this.apiFinal24List = final24));
  }


  ngOnInit(): void {
  }

}
