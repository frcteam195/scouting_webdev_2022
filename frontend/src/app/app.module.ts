import { HttpClientModule } from '@angular/common/http';
import { DefaultModule } from './layouts/default/default.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryGraphComponent } from './modules/summary-graph/summary-graph.component';
import { WordCloudComponent } from './modules/word-cloud/word-cloud.component';


@NgModule({
  declarations: [
    AppComponent,
    SummaryGraphComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
