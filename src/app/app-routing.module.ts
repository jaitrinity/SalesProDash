import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './ComponentViews/attendance/attendance.component';
import { HomeComponent } from './ComponentViews/home/home.component';
import { LeavesComponent } from './ComponentViews/leaves/leaves.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AuthGuardGuard } from './Services/auth-guard.guard';

const routes: Routes = [
  {path : '', redirectTo:'/Login', pathMatch:'full'},
  {path : 'Login', component : LoginPageComponent},
  {path : 'Home', component : MainScreenComponent, canActivate : [AuthGuardGuard] , children : [
    {path : 'Attendance', component : AttendanceComponent},
    {path : 'Leaves', component : LeavesComponent},
    {path : 'Outlet', component : LeavesComponent},
    {path : 'PJP', component : LeavesComponent},
    {path : 'Mapping', component : LeavesComponent},
    {path : 'KPI', component : LeavesComponent},
    {path : 'Help', component : LeavesComponent}, 
    {path : 'MapView', component : LeavesComponent},
    {path : '', component : HomeComponent }
  ]
},
{path: '**', component : ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
