import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Teams } from 'src/app/services/api.service';

@Component({
  selector: 'app-pit-data',
  templateUrl: './pit-data.component.html',
  styleUrls: ['./pit-data.component.scss']
})
export class PitDataComponent implements OnInit {

  @Input() team: string;
  apiTeamsList: Teams[] = [];  

  constructor(private apiService: ApiService) { 
    this.apiService.TeamsReplay.subscribe((Teams) => (this.apiTeamsList = Teams));

    this.team="195";
  }

  getWheelType(ID: Number) {
    
    return "Error, No ID Detected"
  }
  getDriveType(ID: Number) {
    if (ID == 1)
      return "Mecanum";
    else if (ID == 2)
      return "Tank"
    else if (ID == 3)
      return "H-Drive"
    else if (ID == 4)
      return "Other"
    else if (ID == 5)
      return "Swerve"
    
    return "Error, No ID Detected"
  }

  ngOnInit(): void {
  }

}
