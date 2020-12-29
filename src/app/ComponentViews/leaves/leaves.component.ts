import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { EmpDetails } from 'src/app/Structures/EmpDetailStruct';
import { LeavesDataSource, LeavesItem } from './leaves-datasource';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

import { default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class LeavesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<LeavesItem>;

  //FUNCTION FOR UPDATING THE DATA.
  UpdateData() {
    //GETTING THE LEAVES DATA 1ST TIME.
    let LeaveData$ = this.dataserv.GetService(this.ServiceName, this.Parameters);
    LeaveData$.pipe(
      this.dataserv.handleErrorPipe(),
    ).subscribe(
      res => {
        let datarecieved = this.dataserv.HandleResponse(res);
        if(datarecieved === 'Token Invalid'){
          this.router.navigate(['/nothing']);
        }
        else if(datarecieved) {
          this.LeavesDataSource = datarecieved['DataSource'];
          this.Lcount = this.LeavesDataSource.length;
          this.displayedColumns = datarecieved['Columns'];
          this.LeavesDataSource = new MatTableDataSource(this.LeavesDataSource);
          this.LeavesDataSource.sort = this.sort;
          this.LeavesDataSource.paginator = this.paginator;
        }
      }
    )

  }

  setDefault() {
    this.Parameters.StartDate = '2020-01-01';
    this.Parameters.EndDate = this.tyear + '-' + this.tmonth + '-' + this.tdate;

    this.UpdateData();
  }


  EmpdataSource : EmpDetails;
  EmpName = '';

  //SETTING THE PARAMETERS AND THE SERVICE NAME.
  ddate = new Date();
  tdate = this.ddate.getDate();
  tmonth = this.ddate.getMonth() + 1;
  tyear = this.ddate.getFullYear();

  ServiceName = 'LeavesData';
  Parameters = {
    StartDate : '2020-01-01',
    EndDate : this.tyear + '-' + this.tmonth + '-' + this.tdate
  }

  FilterList = [
    {value : 'category', view : 'Category'},
    {value : 'Subcategory', view : 'Sub Category'},
  ]

  //APPLYING FILTER TO THE DATA SOURCE.
  applyFilter(FilterValue : string) {
    this.LeavesDataSource.filter = FilterValue.trim().toLowerCase();
  }

  //range picker 
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  //HANDLING DATE CHANGE EVENTS.
  ChangeDate(type : string, event: MatDatepickerInputEvent<Date>){
    if(type === 'Start'){
      this.Parameters.StartDate = moment(event.value).format('YYYY-MM-DD');
    }
    else if(type === 'end' && event.value) {
      this.Parameters.EndDate = moment(event.value).format('YYYY-MM-DD');
    }
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];
  LeavesDataSource : any ;
  Lcount : number = 0;



  constructor(private Empdetail :EmpDetailsProviderService, private dataserv : MainServiceService, private router : Router) {}

  ngOnInit() {
    
    this.UpdateData();

    this.EmpdataSource = this.Empdetail.EmpDataSource;
    this.EmpName = this.EmpdataSource.Name;
  }

  ngAfterViewInit() {
    this.EmpdataSource = this.Empdetail.EmpDataSource;
    this.EmpName = this.EmpdataSource.Name;

  }
}
