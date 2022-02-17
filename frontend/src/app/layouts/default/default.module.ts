import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './../../modules/home/home.component';
import { RouterModule } from '@angular/router';
import { MatchComponent } from './../../modules/match/match.component';
import { RobotComponent } from './../../modules/robot/robot.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';



@NgModule({
  declarations: [
    DefaultComponent,
    RobotComponent,
    MatchComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ],
  providers: [
    HttpClientModule,
    ApiService
  ]
})
export class DefaultModule { }