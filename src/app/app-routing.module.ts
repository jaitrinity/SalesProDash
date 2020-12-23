import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './ComponentViews/attendance/attendance.component';
import { HelpComponent } from './ComponentViews/help/help.component';
import { HomeComponent } from './ComponentViews/home/home.component';
import { KPIComponent } from './ComponentViews/kpi/kpi.component';
import { LeavesComponent } from './ComponentViews/leaves/leaves.component';
import { MapViewComponent } from './ComponentViews/map-view/map-view.component';
import { MappingComponent } from './ComponentViews/mapping/mapping.component';
import { OutletComponent } from './ComponentViews/outlet/outlet.component';
import { PJPComponent } from './ComponentViews/pjp/pjp.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AuthGuardGuard } from './Services/auth-guard.guard';

const routes: Routes = [
  {path : '', redirectTo:'/Login', pathMatch:'full'},
  {path : 'Login', component : LoginPageComponent},
  {path : 'Home', component : MainScreenComponent, canActivate : [AuthGuardGuard] , children : [
    {path : 'OverView', component : HomeComponent},
    {path : 'Attendance', component : AttendanceComponent},
    {path : 'Leaves', component : LeavesComponent},
    {path : 'Outlet', component : OutletComponent},
    {path : 'PJP', component : PJPComponent},
    {path : 'Mapping', component : MappingComponent},
    {path : 'KPI', component : KPIComponent},
    {path : 'Help', component : HelpComponent}, 
    {path : 'MapView', component : MapViewComponent},
    {path : '', redirectTo : '/Home/OverView', pathMatch : 'full'}
  ]
},
{path: '**', component : ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
