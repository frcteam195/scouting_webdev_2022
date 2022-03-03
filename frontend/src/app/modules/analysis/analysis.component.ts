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
  graphShow = true;
  tableShow = false;  //show table view by default
  focusTeam: string;

  //apiAnalysis: CEA[] = [];
  apiFinal24List: Final24[] = [];

  constructor(public apiService: ApiService) {
    //this.apiService.CEAReplay.subscribe((analysis) => (this.apiAnalysis = analysis));
    //this.apiService.Final24Replay.subscribe((final24) => (this.apiFinal24List = final24));
    this.apiFinal24List = [new Final24()];
    this.analysisTypeID = 1;
    this.focusTeam = "";

  }

  ngOnInit(): void  {
    // we will initialize our form here
     this.apiService.getFinal24().then(response => this.apiFinal24List = response);
  }

  teamSelectionChange() {
    // Angular won't detect changes inside an array - so set the array to a new array to force the change detection to fire
    this.apiFinal24List = this.apiFinal24List.slice();
  }

  addEnd() {
    this.apiFinal24List.splice(this.apiFinal24List.length, 0, new Final24());
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

  select(type: number, analysis: number) {
    if (type == 1) {
      this.analysis1 = analysis;
    } else {
      this.analysis2 = analysis;
    }

  }

  // Deteremine the Analysis Types to send to the team-table component
  changeDisplay(type: number) {
    console.log("Display Type: " + type)
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
    console.log("Left Table: " + this.analysis1 + ", Right Table: " + this.analysis2 );

  }

  changeSort(type: number) {

    console.log("Sort Type: " + type)
    if (type == 1) {
      this.sortType = 2;
    } else {
      this.sortType = 1;
    }
  }

  changeView(view: number) {

    console.log("View Type: " + view)
    if (view == 1) {
      this.viewType = 2;
    } else {
      this.viewType = 1;
    }
    this.graphShow = !this.graphShow;
    this.tableShow = !this.tableShow;

    console.log("Graph: " + this.graphShow + " Table: " + this.tableShow);
  }


  listRecipients() {
    console.log("Hello!");
  }

  save() {
    // call API to save customer
    console.log("Hello!");
  }

  onChanges(): void {

    console.log("Change IDentified");
  }

  print_team(team: string) {
    console.log("Team Passed back from Child: " + team);
    this.focusTeam = team;
  }
  

}
