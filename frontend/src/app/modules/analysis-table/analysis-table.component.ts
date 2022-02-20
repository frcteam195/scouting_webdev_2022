import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';

@Component({
  selector: 'app-analysis-table',
  templateUrl: './analysis-table.component.html',
  styleUrls: ['./analysis-table.component.scss']
})
export class AnalysisTableComponent implements OnInit {

  apiAnalysis: CEA[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
  }

  ngOnInit(): void {
  }

}
