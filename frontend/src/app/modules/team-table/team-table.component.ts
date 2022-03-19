import { Router } from '@angular/router';
import { SelectorMatcher } from '@angular/compiler';
import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { ApiService, CEA, Final24} from '../../services/api.service'
import { Types } from 'src/app/types';


@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit, OnChanges {

  @Input() teamList: Final24[];
  @Input() analysisTypeID: Number | undefined;
  @Input() sort: Number;
  @Input() focus: string;
  @Input() filter: number;

  @Output() sendTeamEvent = new EventEmitter<string>();

  apiAnalysis: CEA[] = [];
  apiAnalysis_filter: CEA[] = [];
  apiTypes: Types[] = [];
  title: String;
  team: string;
  fFlag: string;

  normalShow = false;
  baShow = true;


  constructor(private apiService: ApiService, private router: Router) {
    this.apiAnalysis_filter = [];
    this.apiAnalysis = [];
    this.title = "Title";
    this.teamList = [];
    this.sort = 1;
    this.team = "";
    this.focus = "";
    this.filter = 0;
    this.fFlag = "N";

    // Update the filter whenever the inputting data changes
    this.apiService.CEAReplay.subscribe(analysis => {
      this.apiAnalysis = analysis;
      this.regenerateFilter();
    });

    // Get Analysis Type Info
    this.apiService.TypesReplay.subscribe(types => {
      this.apiTypes = types;
    });

  }

  ngOnInit(): void {
    //console.log("Analysis Passed to Component: " + this.analysisTypeID);
  }

  ngOnChanges() {
    this.regenerateFilter();
    this.teamSelect(this.focus);
  }

  localSort(type: number) {
    //console.log("Local Sort Type: " + type)
    this.sort = type;
    this.regenerateFilter();
  }

  teamPage(team: string) {
    //console.log("Calling Robot Page with: " + team)
    //this.router.navigateByUrl('/robot/'+team);
    // Opens in New Tab
    this.router.navigate([]).then(result => { window.open('#/robot/'+team, '_blank'); }); 
  }

  teamSelect(team: string) {
    //console.log("Current Team: " + this.team);
    if (team == this.team) {
        //this.team = "";
        //console.log("Highlight off");
    } else {
      this.team = team;
      //console.log("Highlighting Robot: " + team);
    }
    
    // Send team back to parent component
    this.sendTeamEvent.emit(this.team);
    
  }

  regenerateFilter() {
    //console.log("Analysis Passed to Component: " + this.analysisTypeID);

    if (this.apiAnalysis && this.apiAnalysis.length && this.teamList && this.teamList.length) {

      this.apiAnalysis_filter = [];

      if (this.analysisTypeID == 80) {
        this.normalShow = true;
        this.baShow = false;
      } else {
        this.normalShow = false;
        this.baShow = true;
      }

      let rcount = 0;
      for (const cea of this.apiAnalysis){
        if (cea.AnalysisTypeID == this.analysisTypeID) {
          rcount = 0;   // set count to 0
          this.fFlag = "N";
          for (const team of this.teamList) {
            //console.log("cea.Team: [" + cea.Team + "] Team: [" + team.Team + "]");
            if (cea.Team == team.Team) {
              if (this.filter == 0) {
                rcount = rcount+1;// increment count
                //team.Team = "";
                break;
              } else {
                //this.apiAnalysis_filter.push(cea);
                this.fFlag = "Y";
              }
            } 
          }
          // if count is still 0, write record if filter value is off
          // if fFlag is Y, write record if filter value is on
          if ((rcount == 0 && this.filter == 0) || (this.fFlag == "Y" && this.filter == 1)) {
            this.apiAnalysis_filter.push(cea);
            
          }
        }
      }
      // Sort Logic
      if (this.sort == 1)  {
        if (this.analysisTypeID == 80) {
          this.apiAnalysis_filter.sort((a, b) => a.Summary2Value - b.Summary2Value);
        } else {
          this.apiAnalysis_filter.sort((a, b) => b.Summary2Value - a.Summary2Value);
        }
      } else if (this.sort == 3) {
        //this.apiAnalysis_filter.sort((a, b) => (a.Team > b.Team) ? 1 : -1);
        this.apiAnalysis_filter.sort((a, b) => b.Summary1Value - a.Summary1Value);
        
      } else {
        //this.apiAnalysis_filter.sort((a, b) => (a.Team > b.Team) ? 1 : -1);
        this.apiAnalysis_filter.sort((a, b) => Number(a.Team) - Number(b.Team));
      }


      // Lookup AnalysisType for Title and Description
      for (const type of this.apiTypes) {
        if (type.AnalysisTypeID == this.analysisTypeID) {
          if (type.Description != null) {
            this.title = type.AnalysisType + " (" + type.Description + ")";
          } else {
            this.title = type.AnalysisType;
          }
          
          break; 
        } 
      }

    } else {
      this.apiAnalysis_filter = [];
    }

  }

}
