import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { MainScreenComponent } from '../main-screen/main-screen.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { OutletComponent } from './outlet/outlet.component';
import { MaterialsModule } from '../materials/materials.module';
import { PJPComponent } from './pjp/pjp.component';
import { MappingComponent } from './mapping/mapping.component';
import { KPIComponent } from './kpi/kpi.component';
import { HelpComponent } from './help/help.component';
import { MapViewComponent } from './map-view/map-view.component';
import { LeavesComponent } from './leaves/leaves.component';
import { MenuRoutingModule } from './menu-routing.module';




@NgModule({
  declarations: [
    AttendanceComponent,
    LeavesComponent,
    OutletComponent,
    PJPComponent,
    MainScreenComponent,
    HomeComponent,
    MappingComponent,
    KPIComponent,
    HelpComponent,
    MapViewComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
