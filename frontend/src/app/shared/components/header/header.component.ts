import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lastDBtime: string;


  constructor() { 

    this.lastDBtime = "";
  }

  ngOnInit(): void {
    this.lastDBtime = localStorage.getItem('lastDB') || "";
  }

}
