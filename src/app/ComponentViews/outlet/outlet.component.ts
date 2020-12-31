import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { EmpDetails } from 'src/app/Structures/EmpDetailStruct';
import { OutletDataSource, OutletItem } from './outlet-datasource';
import * as _moment from 'moment';

import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
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
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OutletComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<OutletItem>;

  dataSource: OutletDataSource;

  ShowLoading = false;

  //SETTING THE PARAMETERS Dates.
  ddate = new Date();
  tdate = this.ddate.getDate();
  tmonth = this.ddate.getMonth() + 1;
  tyear = this.ddate.getFullYear();

  //SETTING THE SERVICE NAMES AND THE PARAMETERS.
  ServiceName = 'OutletData';
  Parameters = {
    StartDate: '2020-01-01',
    EndDate: this.tyear + '-' + this.tmonth + '-' + this.tdate
  }


  //FUNCTION FOR UPDATING THE DATA.
  UpdateData() {
    //GETTING THE DATA
    this.ShowLoading = true;
    let OutletData$ = this.dataserv.GetService(this.ServiceName, this.Parameters);

    OutletData$.pipe(
      this.dataserv.handleErrorPipe()
    )
      .subscribe(
        res => {
          let datarecieved = this.dataserv.HandleResponse(res);
          if (datarecieved === 'Token Invalid') {
            //handle Invalid Token
          }
          if (datarecieved) {

            this.SubdealerSource = datarecieved['Sub_Dealer']['data'];
            this.subcols = datarecieved['Sub_Dealer']['Columns'];
            this.SubDealerCount = this.SubdealerSource.length;
            this.SubdealerSource = new MatTableDataSource(this.SubdealerSource);

            this.DistributerSource = datarecieved['Distributor']['data'];
            this.districols = datarecieved['Distributor']['Columns'];
            this.DistriCount = this.DistributerSource.length;
            this.DistributerSource = new MatTableDataSource(this.DistributerSource);

            this.DealerSource = datarecieved['Dealer']['data'];
            this.Dealercols = datarecieved['Dealer']['Columns'];
            this.DealerCount = this.DealerSource.length;
            this.DealerSource = new MatTableDataSource(this.DealerSource);

            this.OfficeSource = datarecieved['Office']['data'];
            this.officols = datarecieved['Office']['Columns'];
            this.officeCount = this.OfficeSource.length;
            this.OfficeSource = new MatTableDataSource(this.OfficeSource);

            this.ArchitectSource = datarecieved['Architect']['data'];
            this.archicols = datarecieved['Architect']['Columns'];
            this.ArchitectCount = this.ArchitectSource.length;
            this.ArchitectSource = new MatTableDataSource(this.ArchitectSource);

            this.BuilderSource = datarecieved['Builder']['data'];
            this.buildercols = datarecieved['Builder']['Columns'];
            this.BuilderCount = this.BuilderSource.length;
            this.BuilderSource = new MatTableDataSource(this.BuilderSource);

            this.ContractorSource = datarecieved['Contractor']['data'];
            this.contcols = datarecieved['Contractor']['Columns'];
            this.ContractorCount = this.ContractorSource.length;
            this.ContractorSource = new MatTableDataSource(this.ContractorSource);

            this.PlumberSource = datarecieved['Plumber']['data'];
            this.plumcols = datarecieved['Plumber']['Columns'];
            this.PlumberCount = this.PlumberSource.length;
            this.PlumberSource = new MatTableDataSource(this.PlumberSource);

            this.ProspectSource = datarecieved['Prospect']['data'];
            this.proscols = datarecieved['Prospect']['Columns'];
            this.ProspectCount = this.ProspectSource.length;
            this.ProspectSource = new MatTableDataSource(this.ProspectSource);

            this.ProjectSiteSource = datarecieved['Project']['data'];
            this.projecols = datarecieved['Project']['Columns'];
            this.ProjectCount = this.ProjectSiteSource.length;
            this.ProjectSiteSource = new MatTableDataSource(this.ProjectSiteSource);

            this.totalOutCount = this.SubDealerCount + this.ContractorCount + this.officeCount + this.ArchitectCount + this.BuilderCount + this.ProspectCount + this.PlumberCount + this.ProjectCount + this.DealerCount + this.DistriCount;
          }
        },
        err => console.log('http error', err),
        () => this.ShowLoading = false,
      );
  }

  //Subealer Datasource
  SubdealerSource: any;
  subcols = ["Firm_Name", "Owner_Name", "Email_id", "Contact_Details", "Registered_by", "Territory_code", "Territory_name"];
  SubDealerCount: number = 0;

  //Contractor DataSource
  ContractorSource: any;
  contcols = ["Name_of_Contractor", "Contact_Details", "Email_id", "Registered_by", "Territory_code", "Territory_name"];
  ContractorCount: number = 0;

  //Office DataSource
  OfficeSource: any;
  officols = ["Location", "Registered_by", "Territory_code", "Territory_name"];
  officeCount: number = 0;

  //Architect DataSource
  ArchitectSource: any;
  archicols = ["Name_of_architect", "Contact_Details", "Email_id", "Upcoming_sites", "Registered_by", "Territory_code", "Territory_name"];
  ArchitectCount: number = 0;

  //Builder DataSource
  BuilderSource: any;
  buildercols = ["Name_of_person", "Registered_by", "Territory_code", "Territory_name"];
  BuilderCount: number = 0;

  //Prospect DataSource
  ProspectSource: any;
  proscols = ["Type", "Product", "Firm_Name", "Owner_Name", "Contact_Details", "Email_id", "Dealing_Brands", "Shop_size_in_sqft", "Shop_Turnover_last_Fy", "Registered_by", "Territory_code", "Territory_name"];
  ProspectCount: number = 0;

  //Plumber DataSOurce
  PlumberSource: any;
  plumcols = ["Name_of_Plumber", "Contact_Details", "Email_id", "Registered_by", "Territory_code", "Territory_name"];
  PlumberCount: number = 0;

  //Project DataSource
  ProjectSiteSource: any;
  projecols = ["Name_of_site", "Type_of_site", "No_of_bathroom", "Contact_person", "Contact_No", "Email_id", "Contractor_name", "Contractor_mobile", "Registered_by", "Territory_code", "Territory_name"];
  ProjectCount: number = 0;

  //Dealer DataSource
  DealerSource: any;
  Dealercols = ["Firm_Name", "Name_of_person", "Email_id", "Contact_Detail", "Registered_by", "Territory_code", "Territory_name"];
  DealerCount: number = 0;

  //Distributer DataSource
  DistributerSource: any;
  districols = ["Firm_Name", "Name_of_person", "Email_id", "Contact_Detail", "Registered_by", "Territory_code", "Territory_name"];
  DistriCount: number = 0;


  totalOutCount: number = this.SubDealerCount + this.ContractorCount + this.officeCount + this.ArchitectCount + this.BuilderCount + this.ProspectCount + this.PlumberCount + this.ProjectCount + this.DealerCount + this.DistriCount;

  EmpdataSource: EmpDetails;
  EmpName = '';

  //CONTROLING THE VIEWS OF THE COMPONENT.
  AllView = true;
  OnChangeView(value: string) {
    switch (value) {
      case 'All': {
        this.AllView = true;
        this.Parameters = {
          StartDate: '2020-01-01',
          EndDate: this.tyear + '-' + this.tmonth + '-' + this.tdate
        };
        this.UpdateData();
      }
      case 'CategoryWise': {
        this.AllView = false;
      }
    }
  }

  //array for outlet types.
  OutletTypesArray = ['Sub_Dealer', 'Distributor', 'Dealer', 'Office', 'Architect', 'Builder', 'Contractor', 'Plumber', 'Prospect', 'Project'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  FilterList = [
    { value: 'category', view: 'Category' },
    { value: 'Subcategory', view: 'Sub Category' },
  ];

  applyFilet(filtervalue: string) {
    this.SubdealerSource.filter = filtervalue.trim().toLowerCase();
    this.DealerSource.filter = filtervalue.trim().toLowerCase();
    this.ArchitectSource.filter = filtervalue.trim().toLowerCase();
    this.OfficeSource.filter = filtervalue.trim().toLowerCase();
    this.ContractorSource.filter = filtervalue.trim().toLowerCase();
    this.BuilderSource.filter = filtervalue.trim().toLowerCase();
    this.ProspectSource.filter = filtervalue.trim().toLowerCase();
    this.PlumberSource.filter = filtervalue.trim().toLowerCase();
    this.ProjectSiteSource.filter = filtervalue.trim().toLowerCase();
    this.DistributerSource.filter = filtervalue.trim().toLowerCase();
  }

  //range picker 
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  //HANDLING DATE CHANGE EVENTS.
  ChangeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'Start') {
      this.Parameters.StartDate = moment(event.value).format('YYYY-MM-DD');
    }
    else if (type === 'end' && event.value) {
      this.Parameters.EndDate = moment(event.value).format('YYYY-MM-DD');
    }
  }


  constructor(private Empdetail: EmpDetailsProviderService, private dataserv: MainServiceService) { }
  displayedColumns = ['id', 'name'];


  ngOnInit() {
    //Updating the data for main view.
    this.UpdateData();

  }

  ngAfterViewInit() {
    if(this.Empdetail.EmpDataSource){
      this.EmpdataSource = this.Empdetail.EmpDataSource;
      this.EmpName = this.EmpdataSource.Name;
    }

  }
}
