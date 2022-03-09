export class WordCloud {
    MatchID: number;
    Team: string;
    WordID: number;
    Word: string;
    WordCount: number;

constructor(MatchID: number,
    Team: string,
    WordID: number,
    Word: string,
    WordCount: number, ){
    this.MatchID=MatchID;
    this.Team=Team;
    this.WordID=WordID;
    this.Word=Word;
    this.WordCount=WordCount;
}}
