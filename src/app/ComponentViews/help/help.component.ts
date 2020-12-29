import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { EmpDetails } from 'src/app/Structures/EmpDetailStruct';
import { HelpDataSource, HelpItem } from './help-datasource';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

import { default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';

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
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HelpComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<HelpItem>;


  UpdateData() {
    //GETTING THE DATA
    let Help$ = this.dataserv.GetService(this.ServiceName, this.Parameters);
    Help$.pipe(
      this.dataserv.handleErrorPipe(),
      )
    .subscribe(
      res => {
        let datarecieved = this.dataserv.HandleResponse(res);
        if(datarecieved === 'Token Invalid'){
          this.router.navigate(['/nothing']);
        }
        else if(datarecieved) {
          this.HelpDataSource = datarecieved['DataSource'];
          this.Hcount = this.HelpDataSource.length;
          this.displayedColumns = datarecieved['Columns'];
          this.HelpDataSource = new MatTableDataSource(this.HelpDataSource);
          this.HelpDataSource.sort = this.sort;
          this.HelpDataSource.paginator = this.paginator;
        }
      },
      err => console.log('http error', err),
      () =>  console.log("Http Request Completed")
    );
  }

  setDefault() {
    this.Parameters.StartDate = '2020-01-01';
    this.Parameters.EndDate = this.tyear + '-' + this.tmonth + '-' + this.tdate;

    this.UpdateData();
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

   //SETTING THE PARAMETERS AND THE SERVICE NAME.
   ddate = new Date();
   tdate = this.ddate.getDate();
   tmonth = this.ddate.getMonth() + 1;
   tyear = this.ddate.getFullYear();

  //SETTING THE SERVICE NAME AND SERRVICE PARAMETERS.
  ServiceName = 'HelpData';
  Parameters = {
    StartDate : '2020-01-01',
    EndDate : this.tyear + '-' + this.tmonth + '-' + this.tdate
  }

  EmpdataSource : EmpDetails;
  EmpName = '';

  FilterList = [
    {value : 'category', view : 'Category'},
    {value : 'Subcategory', view : 'Sub Category'},
    {value : 'remark', view : 'Remark'}
  ];

  //APPLYING FILTER TO THE TABLE.
  applyFilter(filtervalue : string) {
    this.HelpDataSource.filter = filtervalue.trim().toLowerCase();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  HelpDataSource : any ;
  displayedColumns = [];
  Hcount : number = 0;

  constructor (private Empdetail : EmpDetailsProviderService, private dataserv : MainServiceService, private router : Router) {}

  ngOnInit() {

    this.UpdateData();
    
    // this.dataSource = new HelpDataSource();
    this.EmpdataSource = this.Empdetail.EmpDataSource;
    this.EmpName = this.EmpdataSource.Name;

  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.EmpdataSource = this.Empdetail.EmpDataSource;
    this.EmpName = this.EmpdataSource.Name;

  }
}
