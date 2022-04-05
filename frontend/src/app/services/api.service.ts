import { Word } from './../word';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {F} from "@angular/cdk/keycodes";
import { formatDate } from '@angular/common';
import { relayout } from 'plotly.js-dist-min';
import { Types } from '../types';
import { WordCloud } from '../wordcloud';
 

export class Final24 {
  Team: string;

  constructor() {
    this.Team = '';
  }
}

export interface CEA {
  Team: string;
  AnalysisType: string;
  AnalysisTypeID: number;
  EventID: number;
  Match1Display: string;
  Match1Format: number;
  Match1Value: number;
  Match2Display: string;
  Match2Format: number;
  Match2Value: number;
  Match3Display: string;
  Match3Format: number;
  Match3Value: number;
  Match4Display: string;
  Match4Format: number;
  Match4Value: number;
  Match5Display: string;
  Match5Format: number;
  Match5Value: number;
  Match6Display: string;
  Match6Format: number;
  Match6Value: number;
  Match7Display: string;
  Match7Format: number;
  Match7Value: number;
  Match8Display: string;
  Match8Format: number;
  Match8Value: number;
  Match9Display: string;
  Match9Format: number;
  Match9Value: number;
  Match10Display: string;
  Match10Format: number;
  Match10Value: number;
  Match11Display: string;
  Match11Format: number;
  Match11Value: number;
  Match12Display: string;
  Match12Format: number;
  Match12Value: number;
  Summary1Display: string;
  Summary1Format: number;
  Summary1Value: number;
  Summary2Display: string;
  Summary2Format: number;
  Summary2Value: number;
  Summary3Display: string;
  Summary3Format: number;
  Summary3Value: number;
  Summary4Display: string;
  Summary4Format: number;
  Summary4Value: number;
  Maximum: number;
  Minimum: number;
  Percent: number;
}

export interface Matches {
BlueCargoRanking: number;
BlueFouls: number;
BlueHangarPoints: number;
BlueHangarRanking: number;
BlueScore: number;
BlueTeam1: string;
BlueTeam2: string;
BlueTeam3: string; 
BlueTechFouls: number;
BlueTelePoints: number;
EventID: number;
MatchID: number;
MatchNo: number;
RedCargoRanking: number; 
RedFouls: number;
RedHangarPoints: number;
RedHangarRanking: number;
RedScore: number;
RedTeam1: string;
RedTeam2: string;
RedTeam3: string;
RedTechFouls: number;
RedTelePoints: number;

}

export interface Teams {
  AutoHuman: Number;
  AutoPickUp: Number;
  AutoScoredHigh: Number;
  AutoScoredLow: Number;
  AutoStartPosID: number;
  AutoSummary: String;
  CanClimb: Number;
  ClimbHeightID: Number;
  ClimbPosition: Number;
  ClimbStrategy: String;
  ClimbTime: Number;
  DriveType: String;
  DriveTypeID: Number;
  GearRatio: String;
  HasAuto: Number;
  IntakeType: Number;
  LanguageID: Number;
  LanguageType: String;
  MaxBallCapacity: Number;
  MotorType: String;
  MotorTypeID: Number;
  MoveBonus: Number;
  NumDriveMotors: Number;
  NumGearSpeed: number;
  NumWheels: Number;
  Pneumatics: Number;
  Preload: Number;
  RobotHeight: Number;
  RobotLength: Number;
  RobotWeight: Number;
  RobotWidth: Number;
  Speed: Number;
  Team: Number;
  TeamCity: String;
  TeamCountry: String;
  TeamLocation: String;
  TeamName: String;
  TeamStateProv: String;
  TeleBallsScoredHigh: Number;
  TeleBallsScoredLow: Number
  TeleDefense: Number;
  TeleDefenseEvade: Number;
  TeleDefenseStrat: String;
  TeleShootWhileDrive: Number;
  TeleSortCargo: Number;
  TeleStrategy: String;
  WheelType: String;
  WheelTypeID: Number;
  Image: string;
}

export interface CurrTeams {
  team: Number;
}

export interface Summary {
  AutonomousFormat: number;
  AutonomousMean: number;
  AutonomousMedian: number;
  AutonomousScoreFormat: number;
  AutonomousScoreMean: number;
  AutonomousScoreMedian: number;
  ClimbFormat: number;
  ClimbMean: number;
  ClimbMedian: number;
  EventID: number;
  Summary: number;
  SummaryFormat: number;
  Team: string;
  TeleBallScoreFormat: number;
  TeleBallScoreMean: number;
  TeleBallScoreMedian: number;
  TeleHighBallsFormat: number;
  TeleHighBallsMean: number;
  TeleHighBallsMedian: number;
  TeleLowBallsFormat: number;
  TeleLowBallsMean: number;
  TeleLowBallsMedian: number;
  TeleTotalBallsFormat: number;
  TeleTotalBallsMean: number;
  TeleTotalBallsMedian: number;
  TotalBallsFormat: number;
  TotalBallsMean: number;
  TotalBallsMedian: number;
  TotalScoreFormat: number;
  TotalScoreMean: number;
  TotalScoreMedian: number;
}

export interface Level2 {
  Name: string;
  MatchNo: number;
  TeamNo: number;
  OffensiveQualities: string;
  DefenseQualities: string;
  LabelBot: string;
  GeneralThoughts: string;
  HarishLove: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public CEAReplay: ReplaySubject<CEA[]>;
  public MatchReplay: ReplaySubject<Matches[]>;
  public TeamsReplay: ReplaySubject<Teams[]>;
  public CurrTeamReplay: ReplaySubject<CurrTeams[]>;
  public SummaryReplay: ReplaySubject<Summary[]>;
  public WordReplay: ReplaySubject<Word[]>;
  public TypesReplay: ReplaySubject<Types[]>;
  public CloudReplay: ReplaySubject<WordCloud[]>;
  public Level2Replay: ReplaySubject<Level2[]>;

  private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://10.0.9.92:5000';
  //private apiUrl = 'http://192.168.1.195:23450';  // Dave's House
  //private apiUrl = 'http://10.0.20.195:23450';     // Mark's House
  //private apiUrl = 'https://8zaof0vuah.execute-api.us-east-1.amazonaws.com';  // AWS Test
  //private apiUrl = 'https://8zaof0vuah.execute-api.us-east-1.amazonaws.com/prod/';  // AWS Alternate

  status: string = "";

  constructor(private http: HttpClient) {
    this.CEAReplay = new ReplaySubject(1);
    this.MatchReplay = new ReplaySubject(1);
    this.TeamsReplay = new ReplaySubject(1);
    this.CurrTeamReplay = new ReplaySubject(1);
    this.SummaryReplay = new ReplaySubject(1);
    this.WordReplay = new ReplaySubject(1);
    this.TypesReplay = new ReplaySubject(1);
    this.CloudReplay = new ReplaySubject(1);
    this.Level2Replay = new ReplaySubject(1);

    // Automatically load the data once when the application starts
    this.loadData();
  }

  // This loads the data on service initialization, and then makes the data
  //  available as a ReplaySubject.
  loadData(): void {

    // First try to load a fresh copy of the data from the API
    this.http.get<CEA[]>(this.apiUrl + '/analysis').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CEAReplay.next(response as CEA[]);
      // Might as well store it while we have it
      console.log("Getting Data from Database");

      let now = new Date();
      let date = formatDate(now, 'MM/dd hh:mm a', 'en-US');
      localStorage.setItem('lastDB', date);
      console.log("Time: " + date);

      localStorage.setItem('CEA', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        console.log("Getting Data from Cache");
        this.CEAReplay.next(JSON.parse(localStorage.getItem('CEA')!) as CEA[]);
      } catch (err) {
        console.error('Could not load Analysis data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Matches[]>(this.apiUrl + '/matchinfo').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.MatchReplay.next(response as Matches[]);
      // Might as well store it while we have it
      localStorage.setItem('Matches', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.MatchReplay.next(JSON.parse(localStorage.getItem('Matches')!) as Matches[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<CurrTeams[]>(this.apiUrl + '/currteam').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CurrTeamReplay.next(response as CurrTeams[]);
      // Might as well store it while we have it
      localStorage.setItem('CurrTeams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CurrTeamReplay.next(JSON.parse(localStorage.getItem('CurrTeams')!) as CurrTeams[]);
      } catch (err) {
        console.error('Could not load Current Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Summary[]>(this.apiUrl + '/summary').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.SummaryReplay.next(response as Summary[]);
      // Might as well store it while we have it
      localStorage.setItem('Summary', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.SummaryReplay.next(JSON.parse(localStorage.getItem('Summary')!) as Summary[]);
      } catch (err) {
        console.error('Could not load Summary data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Teams[]>(this.apiUrl + '/pitdata').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TeamsReplay.next(response as Teams[]);
      // Might as well store it while we have it
      localStorage.setItem('Teams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TeamsReplay.next(JSON.parse(localStorage.getItem('Teams')!) as Teams[]);
      } catch (err) {
        console.error('Could not load Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Types[]>(this.apiUrl + '/types').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TypesReplay.next(response as Types[]);
      // Might as well store it while we have it
      localStorage.setItem('Types', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TypesReplay.next(JSON.parse(localStorage.getItem('Types')!) as Types[]);
      } catch (err) {
        console.error('Could not load analysis types from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Level2[]>(this.apiUrl + '/level2').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.Level2Replay.next(response as Level2[]);
      // Might as well store it while we have it
      localStorage.setItem('Level2', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.Level2Replay.next(JSON.parse(localStorage.getItem('Level2')!) as Level2[]);
      } catch (err) {
        console.error('Could not load analysis types from server or cache!');
      }
    });


    // First try to load a fresh copy of the data from the API
    this.http.get<WordCloud[]>(this.apiUrl + '/word-cloud').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CloudReplay.next(response as WordCloud[]);
      // Might as well store it while we have it
      localStorage.setItem('WordCloud', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CloudReplay.next(JSON.parse(localStorage.getItem('WordCloud')!) as WordCloud[]);
      } catch (err) {
        console.error('Could not load Word Cloud data from server or cache!');
      }
    });    

    // First try to load a fresh copy of the data from the API
    this.http.get<Word[]>(this.apiUrl + '/words').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.WordReplay.next(response as Word[]);
      // Might as well store it while we have it
      localStorage.setItem('Word', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.WordReplay.next(JSON.parse(localStorage.getItem('Word')!) as Word[]);
      } catch (err) {
        console.error('Could not load Word data from server or cache!');
      }
    });    
	
  }


  async getFinal24(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    const options = {params: new HttpParams().append('table', 'Final24')};
    // First try to load a fresh copy of the data from the API
    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Final24', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Final24')!) as Final24[];
      } catch (err) {
        console.error('Could not load Final24 data from server or cache!');
        return [];
      }
    }
  }

  saveFinal24(final24: Final24[]){
    localStorage.setItem('Final24', JSON.stringify(final24));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    //const params = new HttpParams().append('table', 'Final24');
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'Final24')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(final24), options).subscribe();

    console.log("Saving Final24 Data");

  }

  async getDnp(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    const options = {params: new HttpParams().append('table', 'DnpList')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('DNP', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('DNP')!) as Final24[];
      } catch (err) {
        console.error('Could not load DNP data from server or cache!');
        return [];
      }
    }
  }  


  saveDnp(dnp: Final24[]){
    localStorage.setItem('DNP', JSON.stringify(dnp));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'DnpList')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(dnp), options).subscribe();

    console.log("Saving DNP Data");

  }

  async getPick(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    const options = {params: new HttpParams().append('table', 'PickList1')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Pick', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Pick')!) as Final24[];
      } catch (err) {
        console.error('Could not load Pick List data from server or cache!');
        return [];
      }
    }
  }  


  savePick(picklist: Final24[]){
    localStorage.setItem('Pick', JSON.stringify(picklist));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'PickList1')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(picklist), options).subscribe();

    console.log("Saving Pick List Data");

  }

  async getWatch1(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    
    const options = {params: new HttpParams().append('table', 'Watch1')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Watch1', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Watch1')!) as Final24[];
      } catch (err) {
        console.error('Could not load Watch1 data from server or cache!');
        return [];
      }
    }
  }  

  saveWatch1(watch1list: Final24[]){
    localStorage.setItem('Wattch1', JSON.stringify(watch1list));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'Watch1')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(watch1list), options).subscribe();

    console.log("Saving Watch1 Data");

  }

  async getWatch2(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API
    
    const options = {params: new HttpParams().append('table', 'Watch2')};

    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24',options).toPromise();
      localStorage.setItem('Watch2', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Watch2')!) as Final24[];
      } catch (err) {
        console.error('Could not load Watch2 data from server or cache!');
        return [];
      }
    }
  }  

  saveWatch2(watch2list: Final24[]){
    localStorage.setItem('Wattch2', JSON.stringify(watch2list));

    //const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'}),
                     params: new HttpParams().append('table', 'Watch2')};
    //this.http.delete(this.apiUrl + '/final24').subscribe(() => this.status = 'Delete successful');
    
    this.http.post<Final24[]>(this.apiUrl + '/final24-update', JSON.stringify(watch2list), options).subscribe();

    console.log("Saving Watch2 Data");

  }

}
