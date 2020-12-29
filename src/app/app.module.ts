import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MainServiceService } from './Services/main-service.service';
import { NotificationComponent } from './notification/notification.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NotifierService } from './Services/notifier.service';
import { AuthGuardGuard } from './Services/auth-guard.guard';
import {MatRippleModule} from '@angular/material/core';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ChartsModule } from "ng2-charts";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {CdkTreeModule} from '@angular/cdk/tree';


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
    MapViewComponent,
    ErrorPageComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    HttpClientModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    ChartsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [MainServiceService, NotifierService, AuthGuardGuard, {
    provide : HTTP_INTERCEPTORS ,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
