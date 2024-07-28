import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetarComponent } from './metar/metar.component';
import { TafComponent } from './taf/taf.component';
import { FullComponent } from './full/full.component';
import { UserActivityComponent } from './user-activity/user-activity.component';

const routes: Routes = [
  { path: 'weather/metar', component: MetarComponent },
  { path: 'weather/taf', component: TafComponent },
  { path: 'weather/full', component: FullComponent },
  { path: 'user/activity', component: UserActivityComponent },
  { path: '', component: MetarComponent },
  // { path: '', redirectTo: '/weather/metar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
