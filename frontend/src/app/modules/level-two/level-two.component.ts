import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level-two',
  templateUrl: './level-two.component.html',
  styleUrls: ['./level-two.component.scss']
})
export class LevelTwoComponent implements OnInit {
  @Input() team: string;

  constructor() {
    this.team="195";
   }

  ngOnInit(): void {
  }

}
