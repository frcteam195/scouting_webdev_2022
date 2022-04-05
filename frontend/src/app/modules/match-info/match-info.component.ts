import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Matches } from 'src/app/services/api.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss']
})
export class MatchInfoComponent implements OnInit {
  @Input() match: number;


  apiMatchList: Matches[];
  constructor(private apiService: ApiService) {
    this.match=0;
    this.apiMatchList = [];
    this.apiService.MatchReplay.subscribe(match => {
      this.apiMatchList = match;
    });
   }

  ngOnInit(): void {
  }

}
