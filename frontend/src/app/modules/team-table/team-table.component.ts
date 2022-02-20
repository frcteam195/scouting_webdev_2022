import { SelectorMatcher } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService, CEA } from '../../services/api.service'


@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {

  @Input() 
  analysisTypeID: Number | undefined;
  
  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
   
  constructor(private apiService: ApiService) {

    this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));

  }

  ngOnInit(): void {

    console.log("Analysis Passed to Component: " + this.analysisTypeID);

    this.apiAnalysis_filter = this.apiAnalysis.filter(res => {
      return res.AnalysisTypeID == this.analysisTypeID
    });


  }

}
