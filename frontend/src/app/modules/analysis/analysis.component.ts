import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from '../../services/api.service';
import { Observable } from 'rxjs';
import CeaJson from '../../cea.json';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  Analysis: CEA[] = CeaJson;

  constructor() { }


  //apiAnalysis: Observable<CEA[]>;
  //
  //constructor(private apiService: ApiService) {
  //  this.apiAnalysis = this.apiService.getAnalysis();
  //}



  ngOnInit(): void {
  }

}
