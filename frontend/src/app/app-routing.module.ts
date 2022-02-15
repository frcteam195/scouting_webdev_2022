import { AnalysisComponent } from './modules/analysis/analysis.component';
import { TeampickComponent } from './layouts/teampick/teampick.component';
import { HomeComponent } from './modules/home/home.component';
import { MatchComponent } from './modules/match/match.component';
import { RobotComponent } from './modules/robot/robot.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
      path: '',
      component: HomeComponent
  }, {
      path: 'robot',
      component: RobotComponent
  }, {
      path: 'match',
      component: MatchComponent    
  }]
}, {
  path: '',
  component: TeampickComponent,
  children: [{
    path: 'analysis',
    component: AnalysisComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
