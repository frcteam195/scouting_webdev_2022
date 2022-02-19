import { HttpClientModule } from '@angular/common/http';
import { TeampickModule } from './layouts/teampick/teampick.module';
import { DefaultModule } from './layouts/default/default.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalysisTableComponent } from './modules/analysis-table/analysis-table.component';
import { TeamTableComponent } from './modules/team-table/team-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AnalysisTableComponent,
    TeamTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    TeampickModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
