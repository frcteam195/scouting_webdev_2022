import { ApiService } from '../../services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Final24Component } from './../../shared/components/final24/final24.component';
import { AnalysisComponent } from './../../modules/analysis/analysis.component';
import { SharedModule } from './../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TeampickComponent } from './teampick.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TeampickComponent
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
export class TeampickModule { }
