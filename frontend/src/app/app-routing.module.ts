import { AnalysisComponent } from './modules/analysis/analysis.component';
import { HomeComponent } from './modules/home/home.component';
import { MatchComponent } from './modules/match/match.component';
import { RobotComponent } from './modules/robot/robot.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './modules/mobile/mobile.component';

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
    path: 'robot/:team',
    component: RobotComponent
  }, {
      path: 'match',
      component: MatchComponent    
  },{
    path: 'analysis',
    component: AnalysisComponent
  }], 
}, {
  path: 'mobile',
  component: MobileComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
