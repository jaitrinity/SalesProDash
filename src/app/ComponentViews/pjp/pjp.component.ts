import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PJPDataSource, PJPItem } from './pjp-datasource';
import * as _moment from 'moment';

import { default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';
import { Router } from '@angular/router';
import { EmpDetails } from 'src/app/Structures/EmpDetailStruct';
import { filter } from 'rxjs/operators';

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
  selector: 'app-pjp',
  templateUrl: './pjp.component.html',
  styleUrls: ['./pjp.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})


export class PJPComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PJPItem>;

  UpdateData() {
    //GETTING THE DATA
    let pjp$ = this.dataserv.GetService(this.ServiceName, this.Parameters);
    pjp$.pipe(
      this.dataserv.handleErrorPipe(),
      )
    .subscribe(
      res => {
        let datarecieved = this.dataserv.HandleResponse(res);
        if(datarecieved === 'Token Invalid'){
          this.router.navigate(['/nothing']);
        }
        else if(datarecieved) {
          this.SalesAndCollectionSource = datarecieved['SalesAndCollection']['data'];
          this.DisplayColSNC = datarecieved['SalesAndCollection']['Columns'];
          this.SNCcount = this.SalesAndCollectionSource.length;
          this.SalesAndCollectionSource = new MatTableDataSource(this.SalesAndCollectionSource);
          this.SalesAndCollectionSource.paginator = this.paginator;
          this.SalesAndCollectionSource.sort = this.sort;

          this.CollectionSource = datarecieved['Collection']['data'];
          this.DisplayColClc = datarecieved['Collection']['Columns'];
          this.Clccount = this.CollectionSource.length;
          this.CollectionSource = new MatTableDataSource(this.CollectionSource);
          this.CollectionSource.sort = this.sort;    
          
          this.OthersSource = datarecieved['Others']['data'];
          this.DisplayColOth = datarecieved['Others']['Columns'];
          this.Othcount = this.OthersSource.length;
          this.OthersSource = new MatTableDataSource(this.OthersSource);
          this.OthersSource.sort = this.sort;

          this.TotalVisits = this.SNCcount + this.Othcount + this.Clccount;
        }
        else {
          console.log('some error');
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
  ServiceName = 'PJPData';
  Parameters = {
    Flag : 'All' ,
    StartDate : '2020-01-01',
    EndDate : this.tyear + '-' + this.tmonth + '-' + this.tdate
  }

  EmpdataSource : EmpDetails;
  EmpName = '';

  FilterList = [
    {value : 'All', view : 'All'},
    {value : 'Completed', view : 'Completed'},
    {value : 'Pending', view : 'Pending'},
    {value : 'Upcomming', view : 'Up Comming'}
  ];

  //CONTROLLING THE VIEW OF THE COMPONENT.
  CurView : string = 'SalesNCollection';
  OnChangeView(val : string){
    this.CurView = val;
    switch (this.CurView) {
      case 'SalesNCollection' : {
        this.SalesAndCollectionSource.paginator = this.paginator;    
        break;
      }
      case 'Collection' : {
        this.CollectionSource.paginator = this.paginator;
        break;
      }
      case 'Others' : {
        this.OthersSource.paginator = this.paginator;
        break;
      }
    }
  }

  CurFlag : string = '';
  FlagChange(value : string){
    this.CurFlag = value;
    this.Parameters.Flag = value;
    this.UpdateData();
  }

  //APPLYING FILTER TO THE TABLE.
  applyFilter(filtervalue : string) {
    switch(this.CurView) {
      case 'SalesNCollection' : {
        this.SalesAndCollectionSource.filter = filtervalue.trim().toLowerCase();
        break;
      };
      case 'Collection' : {
        this.CollectionSource.filter = filtervalue.trim().toLowerCase().toLowerCase();
        break;
      };
      case 'Others' : {
        this.OthersSource.filter = filtervalue.trim().toLowerCase();
        break;
      }
    };
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  SalesAndCollectionSource : any ;
  CollectionSource : any;
  OthersSource : any ;

  DisplayColSNC = [];
  DisplayColClc = [];
  DisplayColOth = [];

  SNCcount : number = 0;
  Clccount : number = 0;
  Othcount : number = 0;
  TotalVisits : number = 0;


  constructor (private dataserv : MainServiceService, private empdetails : EmpDetailsProviderService, private router : Router) {}

  ngOnInit() {
    //Updating the data with default parameters
    this.UpdateData();

    this.EmpdataSource = this.empdetails.EmpDataSource;
    this.EmpName = this.EmpdataSource.Name;
  }

  ngAfterViewInit() {

  }
}
