import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from '../main-screen/main-screen.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { KPIComponent } from './kpi/kpi.component';
import { LeavesComponent } from './leaves/leaves.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MappingComponent } from './mapping/mapping.component';
import { OutletComponent } from './outlet/outlet.component';
import { PJPComponent } from './pjp/pjp.component';

const routes: Routes = [
    {path : 'Views', component : MainScreenComponent, children : [
        {path : '', component : HomeComponent},
        {path : 'OverView', component : HomeComponent},
        {path : 'Attendance', component : AttendanceComponent},
        {path : 'Leaves', component : LeavesComponent},
        {path : 'Outlet', component : OutletComponent},
        {path : 'PJP', component : PJPComponent},
        {path : 'Mapping', component : MappingComponent},
        {path : 'KPI', component : KPIComponent},
        {path : 'Help', component : HelpComponent}, 
        {path : 'MapView', component : MapViewComponent}
    ]}
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
