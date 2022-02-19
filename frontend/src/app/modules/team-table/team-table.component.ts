import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from '../../services/api.service'


@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {

  apiAnalysis: CEA[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getAnalysis().subscribe((analysis) => (this.apiAnalysis = analysis));
  }

  ngOnInit(): void {
  }

}
