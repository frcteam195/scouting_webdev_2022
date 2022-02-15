import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Final24 } from '../../../services/api.service';

@Component({
  selector: 'app-final24',
  templateUrl: './final24.component.html',
  styleUrls: ['./final24.component.scss']
})
export class Final24Component implements OnInit {
  
  title = 'Pick List';
  final24List: Final24[]=[{"SortOrder": 1, "Team": "195"}, {"SortOrder": 2, "Team": "230"},
   {"SortOrder": 3, "Team": "181"}, {"SortOrder": 4, "Team": " "}, {"SortOrder": 5, "Team": " "},
   {"SortOrder": 6, "Team": " "}, {"SortOrder": 7, "Team": " "}, {"SortOrder": 8, "Team": " "},
   {"SortOrder": 9, "Team": " "}, {"SortOrder": 10, "Team": " "}, {"SortOrder": 11, "Team": " "},
   {"SortOrder": 12, "Team": " "}, {"SortOrder": 13, "Team": " "}, {"SortOrder": 14, "Team": " "},
   {"SortOrder": 15, "Team": " "}, {"SortOrder": 16, "Team": " "}, {"SortOrder": 17, "Team": " "},
   {"SortOrder": 18, "Team": " "}, {"SortOrder": 19, "Team": " "}, {"SortOrder": 20, "Team": " "},
   {"SortOrder": 21, "Team": " "}, {"SortOrder": 22, "Team": " "}, {"SortOrder": 23, "Team": " "},
   {"SortOrder": 24, "Team": " "}, {"SortOrder": 25, "Team": " "}];


  constructor() { }

  //apiFinal24List: Observable<Final24[]>;
  //
  //constructor(private apiService: ApiService) {
  //  this.apiFinal24List = this.apiService.getFinal24();
  //}

  ngOnInit(): void {
  }

}
