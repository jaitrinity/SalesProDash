import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from "@angular/material/button";
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './ComponentViews/home/home.component';
import { LeavesComponent } from './ComponentViews/leaves/leaves.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginPageComponent } from './login-page/login-page.component';
import { AttendanceComponent } from './ComponentViews/attendance/attendance.component';
import { OutletComponent } from './ComponentViews/outlet/outlet.component';
import { PJPComponent } from './ComponentViews/pjp/pjp.component';
import { MappingComponent } from './ComponentViews/mapping/mapping.component';
import { KPIComponent } from './ComponentViews/kpi/kpi.component';
import { HelpComponent } from './ComponentViews/help/help.component';
import { MapViewComponent } from './ComponentViews/map-view/map-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    HomeComponent,
    LeavesComponent,
    LoginPageComponent,
    AttendanceComponent,
    OutletComponent,
    PJPComponent,
    MappingComponent,
    KPIComponent,
    HelpComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
