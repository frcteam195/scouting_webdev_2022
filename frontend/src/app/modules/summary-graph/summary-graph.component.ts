import { Component, OnInit } from '@angular/core';
import { ApiService, Summary } from 'src/app/services/api.service';

@Component({
  selector: 'app-summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.scss']
})
export class SummaryGraphComponent implements OnInit {

  apiSummary: Summary[] = [];

  constructor(private apiService: ApiService) {    
    // Update the filter whenever the inputting data changes
      this.apiService.SummaryReplay.subscribe(summary => {
      this.apiSummary = summary;
      this.regenerateFilter();
    }); }
  regenerateFilter() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}   
