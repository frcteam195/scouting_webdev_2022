import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Word } from 'src/app/word';
import { WordCloud } from '../../wordcloud';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {


  apiCloud_filter:WordCloud[]=[];
  apiCloud:WordCloud[]=[];
  apiWord:Word[]=[];
  Team: string;
  constructor(private apiService: ApiService) {
    this.Team="1071";
    
    // Update the filter whenever the inputting data changes
    this.apiService.CloudReplay.subscribe(cloud => {
      this.apiCloud = cloud;
      this.regenerateFilter();
    });

    // Get Analysis Type Info
    this.apiService.WordReplay.subscribe(Word => {
      this.apiWord = Word;
    });
   }

  ngOnInit(): void {
  }

  regenerateFilter() {


    if (this.apiCloud) {

      this.apiCloud_filter = [];

      let word1 = 0;
      let word2 = 0;
      let word3 = 0;
      let word4 = 0;
      let word5 = 0;
      let word6 = 0;
      let word7 = 0;
      for (const c of this.apiCloud){
        if (c.Team == this.Team) {
          console.log ("I Love Harish");
          switch(c.WordID) { 
            case 1: {
               word1= word1 + c.WordCount;
               break; 
            } 
            case 2: {
              word2= word2 + c.WordCount;
              break; 
            } case 3: {
            word3= word3 + c.WordCount;
            break; 
            } case 4: {
            word4= word4 + c.WordCount;
            break; 
            } case 5: {
            word5= word5 + c.WordCount;
            break; 
            } case 6: {
            word6= word6 + c.WordCount;
            break; 
            } 
            case 7: {
              word7= word7 + c.WordCount;
              break; 
           } 
            default: { 
               //statements; 
               break; 
            } 
         } 
        }
      }
     console.log("word1: "+word1);
      // Lookup AnalysisType for Title and Description
      /* for (const type of this.apiWord) {
        if (type.WordID == this.WordID) {
            this.title = type.AnalysisType + " (" + type.Description + ")";
        } else {
          this.title = type.AnalysisType;
        } 
    
        }  */
      

    } else {
      this.apiCloud_filter = [];
    }
  }
}
  

