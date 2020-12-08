import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './ComponentViews/home/home.component';
import { LeavesComponent } from './ComponentViews/leaves/leaves.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

const routes: Routes = [
  {path : 'Dashboard', component : HomeComponent},
  {path : 'Leaves', component : LeavesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
