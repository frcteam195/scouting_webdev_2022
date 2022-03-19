import { Types } from './../../types';
import { Component, OnInit } from '@angular/core';
import { ApiService, CEA, Final24 } from '../../services/api.service';
import CeaJson from '../../cea.json';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  //public myForm: FormGroup; // our form model

  //Analysis: CEA[] = CeaJson;
  analysisTypeID: number;
  analysis1: number = 10;
  analysis2: number = 11;
  type: number = 1;
  sortType: number = 1;
  viewType: number = 1;
  summType: number = 1;
  tableShow = false;  //show table view by default
  graphShow = true;
  fullShow = false;  //show full view by default, not compare
  compareShow = true;
  detailShow = false; //show analysis types, not summary
  summaryShow = true;
  focusTeam: string;

  //apiAnalysis: CEA[] = [];
  apiFinal24List: Final24[] = [];
  apiTypes: Types[] = [];
  apiDnpList: Final24[] = [];
  apiPickList: Final24[] = [];

  compareForm = this.formBuilder.group({
    team1: '',
    team2: '',
    team3: '',
    team4: '',
    team5: '',
    team6: '',
    team7: '',
    team8: ''
  });

  compareList: Final24[]=[];
  filterList: Final24[]=[];
  filter: number = 0;

  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    //this.apiService.Final24Replay.subscribe((final24) => (this.apiFinal24List = final24));
    this.apiFinal24List = [new Final24()];
    this.analysisTypeID = 1;
    this.focusTeam = "";
    
  }

  ngOnInit(): void  {
    // we will initialize our form here
    this.apiService.TypesReplay.subscribe(types => { this.apiTypes = types; });

    this.apiService.getDnp().then(response => this.apiDnpList = response);

    this.apiService.getFinal24().then(response => this.apiFinal24List = response);

    this.apiService.getPick().then(response => this.apiPickList = response);

    this.filterList = this.apiFinal24List.concat(this.apiDnpList);
    this.filter = 0;

    this.teamSelectionChange(1);
  }

  teamSelectionChange(list: number) {
    // Angular won't detect changes inside an array - so set the array to a new array to force the change detection to fire
    if (list == 1) {
      this.apiFinal24List = this.apiFinal24List.slice();
    }
    else if (list == 2) {
      this.apiDnpList = this.apiDnpList.slice();
    }
    else if (list == 3) {
      this.apiPickList = this.apiPickList.slice();
    }

    console.log("Change IDentified");
    // Logic to turn filter back off
    //this.filterList = this.apiFinal24List;
    this.filterList = this.apiFinal24List.concat(this.apiDnpList);
    this.filter = 0;
  }

  addEnd(list: number) {
    if (list == 1) {
      this.apiFinal24List.splice(this.apiFinal24List.length, 0, new Final24());
    }
    else if (list == 2) {
      this.apiDnpList.splice(this.apiDnpList.length, 0, new Final24());
    }
    else if (list == 3) {
      this.apiPickList.splice(this.apiPickList.length, 0, new Final24());
    }

  }

  processDoubleClick(index: number){
    if (this.apiFinal24List.length == 1){
      this.apiFinal24List.splice(index, 0, new Final24());
    }
    else if (this.apiFinal24List[index].Team === '') {
      if (this.apiFinal24List.length > 1) {
        this.apiFinal24List.splice(index, 1);
      }
    } else {
      this.apiFinal24List.splice(index, 0, new Final24());
    }
  }

  processDoubleClickDnp(index: number){
    if (this.apiDnpList.length == 1){
      this.apiDnpList.splice(index, 0, new Final24());
    }
    else if (this.apiDnpList[index].Team === '') {
      if (this.apiDnpList.length > 1) {
        this.apiDnpList.splice(index, 1);
      }
    } else {
      this.apiDnpList.splice(index, 0, new Final24());
    }
  }


  processDoubleClickPick(index: number){
    if (this.apiPickList.length == 1){
      this.apiPickList.splice(index, 0, new Final24());
    }
    else if (this.apiPickList[index].Team === '') {
      if (this.apiPickList.length > 1) {
        this.apiPickList.splice(index, 1);
      }
    } else {
      this.apiPickList.splice(index, 0, new Final24());
    }
  }

  select(type: number, analysis: number) {
    if (type == 1) {
      this.analysis1 = analysis;
    } else {
      this.analysis2 = analysis;
    }

  }

  compareTeams(data: { team1: string; team2: string; team3: string; team4: string; team5: string; team6: string; team7: string; team8: string;}): void {
    
    this.compareList = [];

    if (this.filter == 0 ) {
      this.compareList.push({Team: data.team1});
      this.compareList.push({Team: data.team2});
      this.compareList.push({Team: data.team3});
      this.compareList.push({Team: data.team4});
      this.compareList.push({Team: data.team5});
      this.compareList.push({Team: data.team6});
      this.compareList.push({Team: data.team7});
      this.compareList.push({Team: data.team8});
  
      this.filterList = this.compareList;
      this.filter = 1;

    } else {
      // Logic to turn filter back off
      //this.filterList = this.apiFinal24List;
      this.filterList = this.apiFinal24List.concat(this.apiDnpList);
      this.filter = 0;
    }

    this.compareShow = !this.compareShow;
    this.fullShow = !this.fullShow;
 }

  // Deteremine the Analysis Types to send to the team-table component
  changeDisplay(type: number) {
    //console.log("Display Type: " + type)
    if (type == 1) {
      this.analysis1 = 10;
      this.analysis2 = 11;
    } else if (type == 2) {
      this.analysis1 = 20;
      this.analysis2 = 21;
    } else if (type == 3) {
      this.analysis1 = 60;
      this.analysis2 = 61;
    } else if (type == 4) {
      this.analysis1 = 22;
      this.analysis2 = 30;
    } else if (type == 5) {
      this.analysis1 = 40;
      this.analysis2 = 41;
    } else if (type == 6) {
      this.analysis1 = 42;
      this.analysis2 = 43;
    } else if (type == 7) {
      this.analysis1 = 44;
      this.analysis2 = 45;
    } else if (type == 8) {
      this.analysis1 = 46;
      this.analysis2 = 47;
    } else if (type == 9) {
      this.analysis1 = 48;
      this.analysis2 = 49;
    } else if (type == 10) {
      this.analysis1 = 62;
      this.analysis2 = 70;
    } else {
       this.analysis1 = 10;
       this.analysis2 = 11;
    }
    //Turn off Summary Show when Other top buttons are selected
    this.summaryShow = true;
    this.detailShow = false;
  }

  changeSort(type: number) {

    //console.log("Sort Type: " + type)
    if (type == 1) {
      this.sortType = 2;
    } else {
      this.sortType = 1;
    }
  }

  summaryView() {
    this.summaryShow = false;
    this.detailShow = true;
  }

  changeView(view: number) {

    //console.log("View Type: " + view)
    if (view == 1) {
      this.viewType = 2;
    } else {
      this.viewType = 1;
    }
    this.graphShow = !this.graphShow;
    this.tableShow = !this.tableShow;

    //console.log("Graph: " + this.graphShow + " Table: " + this.tableShow);
  }


  listRecipients() {
    console.log("Hello!");
  }

  save() {
    var pass = prompt("Password Required to save to Database");

    if(pass == '999') {
      // call API to save Team Selection Data
      alert("Access Approved");
      this.apiService.saveFinal24(this.apiFinal24List);
      this.apiService.saveDnp(this.apiDnpList);

    } else {
      alert("ERROR: Invalid Password");
    }

  }

  copyToPick() {
    //this.apiPickList  = Object.assign([], this.apiFinal24List)
    this.apiPickList = [];
    //this.apiPickList = Array.from(this.apiFinal24List);
    //for (const team of this.apiFinal24List)  {
    //  this.apiPickList.push(team);
    //}
    this.apiPickList = JSON.parse(JSON.stringify(this.apiFinal24List))

  }

  clearFinal24() {
    for (const t of this.apiFinal24List)  {
      t.Team = "";
    }
    this.teamSelectionChange(1);
  }

  onChanges(): void {

    console.log("Change IDentified");
  }

  print_team(team: string) {
    //console.log("Team Passed back from Child: " + team);
    this.focusTeam = team;
  }
  

}
