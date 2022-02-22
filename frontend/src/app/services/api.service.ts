import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';


export interface Final24 {
  SortOrder: Number;
  Team: String;
}

export interface CEA {
  Team: String;
  AnalysisType: String;
  AnalysisTypeID: number;
  EventID: Number;
  Match1Display: String;
  Match1Format: Number;
  Match1Value: Number;
  Match2Display: String;
  Match2Format: Number;
  Match2Value: Number;
  Match3Display: String;
  Match3Format: Number;
  Match3Value: Number;
  Match4Display: String;
  Match4Format: Number;
  Match4Value: Number;
  Match5Display: String;
  Match5Format: Number;
  Match5Value: Number;
  Match6Display: String;
  Match6Format: Number;
  Match6Value: Number;
  Match7Display: String;
  Match7Format: Number;
  Match7Value: Number;
  Match8Display: String;
  Match8Format: Number;
  Match8Value: Number;
  Match9Display: String;
  Match9Format: Number;
  Match9Value: Number;
  Match10Display: String;
  Match10Format: Number;
  Match10Value: Number;
  Match11Display: String;
  Match11Format: Number;
  Match11Value: Number;
  Match12Display: String;
  Match12Format: Number;
  Match12Value: Number;
  Summary1Display: String;
  Summary1Format: Number;
  Summary1Value: Number;
  Summary2Display: String;
  Summary2Format: Number;
  Summary2Value: Number;
  Summary3Display: String;
  Summary3Format: Number;
  Summary3Value: Number;
  Summary4Display: String;
  Summary4Format: Number;
  Summary4Value: Number;
  Maximum: Number;
  Minimum: Number;
  Percent: Number;
}

export interface Matches {
  BlueTeam1: String;
  BlueTeam2: String;
  BlueTeam3: String;
  MatchNo: Number;
  RedTeam1: String;
  RedTeam2: String;
  RedTeam3: String;
}

export interface Teams {
  AutoHuman: Number;
  AutoPickUp: Number;
  AutoScoredHigh: Number;
  AutoScoredLow: Number;
  AutoStartPosID: Number;
  AutoSummary: String;
  CanClimb: Number;
  ClimbHeightID: Number;
  ClimbPosition: Number;
  ClimbStrategy: String;
  ClimbTime: Number;
  DriveTypeID: Number;
  GearRatio: String;
  HasAuto: Number;
  IntakeType: Number;
  LanguageID: Number;
  MaxBallCapacity: Number;
  MotorTypeID: Number;
  MoveBonus: Number;
  NumDriveMotors: Number;
  NumGearSpeed: Number;
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
  TeleShootWhileDrive: String;
  TeleSortCargo: Number;
  TeleStrategy: String;
  WheelTypeID: Number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public Final24Replay: ReplaySubject<Final24[]>;
  public CEAReplay: ReplaySubject<CEA[]>;
  public TeamsReplay: ReplaySubject<Teams[]>;

  private apiUrl = 'http://192.168.1.195:23450';
  //private apiUrl = 'https://8zaof0vuah.execute-api.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) {
    this.Final24Replay = new ReplaySubject(1);
    this.CEAReplay = new ReplaySubject(1);
    this.TeamsReplay = new ReplaySubject(1);

    // Automatically load the data once when the application starts
    this.loadData();
  }

  // This loads the data on service initialization, and then makes the data
  //  available as a ReplaySubject.
  loadData(): void {

    // First try to load a fresh copy of the data from the API
    this.http.get<Final24[]>(this.apiUrl + '/final24').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.Final24Replay.next(response as Final24[]);
      // Might as well store it while we have it
      localStorage.setItem('Final24', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.Final24Replay.next(JSON.parse(localStorage.getItem('Final24')!) as Final24[]);
      } catch (err) {
        console.error('Could not load Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<CEA[]>(this.apiUrl + '/analysis').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CEAReplay.next(response as CEA[]);
      // Might as well store it while we have it
      localStorage.setItem('CEA', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CEAReplay.next(JSON.parse(localStorage.getItem('CEA')!) as CEA[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Teams[]>(this.apiUrl + '/teams').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TeamsReplay.next(response as Teams[]);
      // Might as well store it while we have it
      localStorage.setItem('Teams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TeamsReplay.next(JSON.parse(localStorage.getItem('Teams')!) as Teams[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });
  }

  getTeams(): Observable<Teams[]> {
    return this.http.get<Teams[]>(this.apiUrl + '/teams');
  }

  getMatches(): Observable<Matches[]> {
    return this.http.get<Matches[]>(this.apiUrl + '/matches');
  }
}
