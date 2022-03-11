import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  display: number;

  constructor() {
    this.display=0;
   }
  
  setDisplay(ID: number){
    this.display=ID;
  }
  ngOnInit(): void {
  }

}
