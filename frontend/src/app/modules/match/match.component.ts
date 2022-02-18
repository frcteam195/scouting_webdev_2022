import { Component, OnInit } from '@angular/core';
import { ApiService, CEA } from 'src/app/services/api.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  apiAnalysis: CEA[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getAnalysis().subscribe((analysis) => (this.apiAnalysis = analysis));
  }

  ngOnInit(): void {
  }

}
