import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  lastDBtime: string;
  display: number;

  constructor() { 

    this.lastDBtime = "";

    this.display=1;
  }

  setDisplay(ID: number){
    this.display=ID;

  }

  ngOnInit(): void {
    this.lastDBtime = localStorage.getItem('lastDB') || "";
  }

}
