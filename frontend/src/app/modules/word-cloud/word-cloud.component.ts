import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Word } from 'src/app/word';
import { WordCloud } from '../../wordcloud';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {

  @Input() selectedTeam: string;

  apiCloud: WordCloud[];
  apiCloud_filter: WordCloud[];
  apiWord: Word[];
  apiWord_filter: Word[];
  graphData: any[];
  team: string;

  public graph = {
    data: [    { x: [], y: [], type: 'bar', name: '', marker: {color: 'red'} }],
    layout: {width: 480, height: 360, xaxis: { type: 'category' }, title: '', margin: {b:20, l:20, r:20, t:20}, yaxis:{range:[-3,3]}}
  };


  constructor(private apiService: ApiService) {
    this.apiCloud = [];
    this.apiCloud_filter = [];
    this.apiWord = [];
    this.apiWord_filter = [];
    this.graphData = [];
    this.team = "";
    this.selectedTeam = "";

    // Get Analysis Type Info
    this.apiService.WordReplay.subscribe(word => {
      this.apiWord = word;
    });


    // Update the filter whenever the inputting data changes
    this.apiService.CloudReplay.subscribe(cloud => {
      this.apiCloud = cloud;
      this.regenerateFilter();
    });

  }

  ngOnInit(): void {

  } 
  
  ngOnChanges() {
    this.regenerateFilter();
  }

  getColor(val: number) {
    if (val >= 0) {
      return 0;
    } else {
      return 1;
    }
  }


  regenerateFilter() {

    if ((this.apiCloud) && (this.apiWord)) {

      this.apiCloud_filter = this.apiCloud;
      this.apiWord_filter = this.apiWord;
      this.team = this.selectedTeam;
      this.graphData = [];

      let word1 = 0;
      let word2 = 0;
      let word3 = 0;
      let word4 = 0;
      let word5 = 0;
      let word6 = 0;
      let word7 = 0;
      let mCount = 0;

      for (const c of this.apiCloud_filter){
        if (c.Team == this.team) {
          console.log("Found Team: "+this.team)
          switch(c.WordID) { 
            case 1: {
              word1 = word1 + c.WordCount;
              // assume a 1 record for all matches to get match count
              mCount = mCount + 1;
              break; 
            } case 2: {
              word2 = word2 + c.WordCount;
              break; 
            } case 3: {
              word3 = word3 + c.WordCount;
              break; 
            } case 4: {
              word4 = word4 + c.WordCount;
              break; 
            } case 5: {
              word5 = word5 + c.WordCount;
              break; 
            } case 6: {
              word6 = word6 + c.WordCount;
              break; 
            } case 7: {
              word7 = word7 + c.WordCount;
              break; 
            } default: { 
               //Word Not Found; 
               break; 
            } 
         } 
        }
      }

      word1 = word1 / mCount;
      word2 = word2 / mCount;
      word3 = word3 / mCount;
      word4 = word4 / mCount;
      word5 = word5 / mCount;
      word6 = word6 / mCount;
      word7 = word7 / mCount;

      var xValueList = [];
      var yValueList = [word1,word2,word3,word4,word5,word6,word7];

      //push words into x value array
      for (const w of this.apiWord_filter) {
        xValueList.push(w.Word);
      }

/*       yValueList.push();
      yValueList.push(word2);
      yValueList.push(word3);
      yValueList.push(word4);
      yValueList.push(word5);
      yValueList.push(word6);
      yValueList.push(word7); */

      this.graphData.push({
        x: xValueList,
        y: yValueList,
        type: "bar",
        showlegend: false,
        name: this.team,
        marker: {
          // check y value and color green if y > 0, otherwise color red
          color: yValueList.map(y => { if (y >= 0) { return '#00FF00'} else { return '#FF0000'} })
        }
        //visible: 
      });

      this.graph = {
        data: this.graphData,
        layout: {width: 480, height: 360, xaxis: { type: 'category' }, title: "Level 2", margin: {b:50, l:20, r:20, t:50}, yaxis:{range:[-3,3]}}
      };

    } else {
      this.apiCloud_filter = [];
    }
  }
}
  

