import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EmpDetails } from 'src/app/Structures/EmpDetailStruct';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';

import { default as _rollupMoment, Moment} from 'moment';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Color, Label } from 'ng2-charts';


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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class HomeComponent implements AfterViewInit, OnInit {
  // CANVAS ELEMENT FOR MONTHLY REGISTERED OUTLETS.
  @ViewChild('MOutReg') MOutRegCanvas: ElementRef;

  //CANVAS ELEMENT FOR YEARLY REGISTERED OUTLETS.
  @ViewChild('YOutReg') YOutRegCanvas: ElementRef;

  //CANVAS ELEMENT FOR MOST REGISTERED OUTLETS.
  @ViewChild('MostOut') MostOutCanvas: ElementRef;

  //CANVAS ELEMENT FOR LEAST REGISTERD OUTLETS.
  @ViewChild('LeastOut') LeastOutCanvas: ElementRef;




  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );




  //SERVICE RELATED FUNCTIONALITY

  //FUCNTION FOR UPDATING THE DATA.
  UpdateData(servicename: string, params: any, flag: string) {
    //GETTING DATA FOR YEARLY REGISTERED OUTLETS.
    const ServiceHandler$ = this.Getservice.GetService(servicename, params);
    ServiceHandler$.pipe(
      this.Getservice.handleErrorPipe()
    ).subscribe(
      res => {
        //CHECKING IF THE RETHROWN OBSERVABLE IS FALSE OR NOT
        if (res) {
          let datarecieved = this.Getservice.HandleResponse(res);
          if (datarecieved == 'Token Invalid') {
            //when the token sent is invalid.
          } else if (datarecieved) {
            //when the expected data is recieved.
            switch (flag) {
              //SWITCHING BEWTEEN THE DIFFEREN OPERATION BASED ON REQUESTED SERVICE.
              case 'MontlyOutlets': {
                this.MOutRegData = datarecieved['MwiseOutlets'];
                this.MOutRegLabels = datarecieved['Xlabels'];
                // this.SetGradient(this.MOutRegData.length);
                // this.disSummary();
                break;
              }
              case 'YearlyOutlets': {
                this.YOutRegData = datarecieved['YwiseOutlets'];
                this.YOutRegLabels = datarecieved['Xlabels'];
                break;
              }
              case 'MostAndLeast' : {
                this.MostOutData = datarecieved['Most_Visited']['data'];
                this.MostOutLabels = datarecieved['Most_Visited']['labels'];
                this.LeastOutData = datarecieved['Least_Visited']['data'];
                this.LeastOutLabels = datarecieved['Least_Visited']['labels'];
                console.log(this.MostOutData);
                break;
              }
              case 'MonthlyVisits' : {
                this.MVisitData = datarecieved['VCount_Week'];
                this.MVisitLabels = datarecieved['Labels'];
                break;
              }
              case 'YearlyVisit' : {
                this.YVisitData = datarecieved['VCont_year'];
                this.YVisitLabels = datarecieved['Labels'];
                break;
              }
              case 'RevenueCollection' : {
                this.RevData = datarecieved['Revenue'];
                this.RevLabels = datarecieved['Labels'];
                // console.log(this.RevData);
                let sum = this.getSum(this.RevData);
                this.SumRevenue = sum;
                break;
              }
              case 'CompletionRate' : {
                this.TotalPlanned = datarecieved['VisitInfo']['TotalVisits'];
                this.TotalVisited = datarecieved['VisitInfo']['CompletedVisits'];
                this.CompletionRate = +((this.TotalVisited/this.TotalPlanned)*100).toFixed(2);
                break;
              }
              case 'PlannedVSummary' : {
                this.planvisitArray = datarecieved['RecentVisits'];
                break;
              }
            }
          }
        }
      }
    );
  }


  //DEFINING THE MONTHS IN AN ARRAY.
  MonthsToDisplay = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  //SETTING PARAMERTERS FOR THE MONTHLY REGISTERED OUTETS.
  paramsMout = {
    Flag: "Monthly",
    FlagStartValue: 202005,
    FlagEndValue: 202007
  };

  //SETTING PARAMETERS FOR THE YEARLY REGISTERED OUTLETS.
  paramsYout = {
    Flag: "Yearly",
    FlagStartValue: 2019,
    FlagEndValue: 2020
  };

  //SETTING PARAMETERS FOR THE MONTHLY VISITS DONE/COUNT.
  paramsMVisits = {
    Flag: "Monthly",
    FlagStartValue: 202005,
    FlagEndValue: 202007
  }

  //SETTING THE PARAMERTERS FOR MONTHLY VISITS DONE/COUNT.
  paramsYVisits = {
    Flag: "Yearly",
    FlagStartValue: 2019,
    FlagEndValue: 2020
  }

  //SETTING THE PARAMERTERS FOR REVENUE.
  paramsRevenue = {
    Year: 2020
  }

  //SETTING THE PARAMETERS FOR THE COMPLETION RATE.
  paramsCompRate = {

  };

  //SETTING THE PARAMETERS FOR THE PLANNED VISITS SUMMARY.
  paramsPlannedVisits = {

  }



  //DATE CONTROLING OBJECTS FOR DATE AND MONTH CONTROLLER.
  OutletRegdate = new FormControl(moment());
  VisitDate = new FormControl(moment());

  //When Year Chnges From Date Picker
  HandleYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>, card : string) {
    if(card === 'OutletCard') {
      const ctrlValue = this.OutletRegdate.value;
      ctrlValue.year(normalizedYear.year());
      this.OutletRegdate.setValue(ctrlValue);
      if(this.CurIndexOutlet){
        let yearselected = +moment(this.OutletRegdate.value).format("YYYY");
        this.paramsYout.FlagStartValue = yearselected;
        this.paramsYout.FlagEndValue = yearselected;
  
      //UPDATING THE YEARLY REGISTERD OUTLETS.
      this.UpdateData('OutletReg', this.paramsYout, 'YearlyOutlets');  
      
      //CLOSING THE DATEPICKER.
        datepicker.close();
      }
    }
    else if(card === "VisitCard"){
      const ctrlValue = this.VisitDate.value;
      ctrlValue.year(normalizedYear.year());
      this.VisitDate.setValue(ctrlValue);
      if(this.CurIndexVisitsDone){
        let yearselected = +moment(this.VisitDate.value).format("YYYY");
        this.paramsYVisits.FlagStartValue = yearselected;
        this.paramsYVisits.FlagEndValue = yearselected;
  
      //UPDATING THE YEARLY REGISTERD OUTLETS.
      this.UpdateData('VisitCount', this.paramsYVisits, 'YearlyVisit');
      
      //CLOSING THE DATEPICKER.
        datepicker.close();
      }
    }
    
  }

  // When Month changes for datepicker.
  MonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, card : string) {
    if(card === 'OutletCard'){
      const ctrlValue = this.OutletRegdate.value;
      ctrlValue.month(normalizedMonth.month());
      this.OutletRegdate.setValue(ctrlValue);
      datepicker.close();
      let dateEntered = moment(this.OutletRegdate.value).format("YYYYMM");
      this.paramsMout.FlagStartValue = +dateEntered;
      this.paramsMout.FlagEndValue = +dateEntered;
      
      //updating the Monthly data.
      this.UpdateData('OutletReg', this.paramsMout, 'MontlyOutlets');
    }

    else if(card === 'VisitCard'){
      const ctrlValue = this.VisitDate.value;
      ctrlValue.month(normalizedMonth.month());
      this.VisitDate.setValue(ctrlValue);
      datepicker.close();
      let dateEntered = moment(this.VisitDate.value).format("YYYYMM");
      this.paramsMVisits.FlagStartValue = +dateEntered;
      this.paramsMVisits.FlagEndValue = +dateEntered;
      
      //updating the Monthly data.
      this.UpdateData('VisitCount', this.paramsMVisits, 'MonthlyVisits');
    }    
    
  }




  //Properties for Monthly Registerd outlet chart.

  public MOutRegData = [];
  public MOutRegOptions = {
    responsive: true,
  };
  public MOutRegLabels: Label[] = [];
  public MOutRegColors: Color[] = [
    {
      backgroundColor: "rgba(242,43,255, 0.3)",
      borderColor: "#F9A1FF"
    }
  ];
  public MOutRegChartType = 'bar';
  public MOutRegLegeds = true;
  public MOutRegPlugins = [];


  //Properties for Yearly Registerd Outlets.

  public YOutRegData = [
  ];
  public YOutRegOptions = {
    responsive: true
  };
  public YOutRegLabels: Label[] = [];
  public YOutRegColors: Color[] = [
    {
      backgroundColor: "rgba(242,43,255, 0.3)",
    }
  ];
  public YOutRegChartType = 'line';
  public YOutRegLegends = true;
  public YOutRegPlugins = [];


  //Dynamic Data For Monthly Outlet Registered.
  ToutReg = [];

  //Display Summary
  disSummary() {
    if(!this.CurIndexOutlet){
      let newaray = [];

      for(let obj of this.MOutRegData){
        let newobj = {};
        newobj['Sum'] = this.getSum(obj['data']);
        newobj['label'] = obj.label;
        newaray.push(newobj);
      }
      this.ToutReg = newaray;
    }
  }



  //Properties for Most Visited Outlets.

  public MostOutData = [
    1, 2, 3, 4, 5
  ];
  public MostOutOptions = {
    responsive: true
  };
  public MostOutLabels: Label[] = [];
  public MostOutColors: Color[] = [
    {
      backgroundColor: ['#009952', '#3AC082', '#65D9A3', '#8AEABE', '#B9FFDF'],
    }
  ];
  public MostOutChartType = 'doughnut';
  public MostOutLegends = true;
  public MostOutPlugins = [];


  //Properties for Least Visited Outlets.

  public LeastOutData = [
    1, 2, 3, 4, 5
  ];
  public LeastOutOptions = {
    responsive: true
  };
  public LeastOutLabels: Label[] = [];
  public LeastOutColors: Color[] = [
    {
      backgroundColor: ['#990000', '#C03A3A', '#D96565', '#EA8A8A', '#FFB9B9'],
    }
  ];
  public LeastOutChartType = 'doughnut';
  public LeastOutLegends = true;
  public LeastOutPlugins = [];


  //Properties for Monthly Visits Done.

  public MVisitData = [
  ];
  public MVisitOptions = {
    responsive: true
  };
  public MVisitLabels: Label[] = [];
  public MVisitColors: Color[] = [
    {
      backgroundColor: "rgba(242,43,255, 0.3)",
    }
  ];
  public MVisitChartType = 'line';
  public MVisitLegends = true;
  public MVisitPlugins = [];


  //Properties for Yearly Visits Done.

  public YVisitData = [
  ];
  public YVisitOptions = {
    responsive: true
  };
  public YVisitLabels: Label[] = [];
  public YVisitColors: Color[] = [
    {
      backgroundColor: "rgba(242,43,255, 0.3)",
    }
  ];
  public YVisitChartType = 'line';
  public YVisitLegend = true;
  public YVisitPlugins = [];


  //Visits Data Array.
  TVisitDone = [];

  //Revenue Collection
  SumRevenue: number;
  viewChart = false;


  //Properties for Revenue Collection.

  public RevData: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public RevOptions = {
    responsive: true,
    scales : {
      xAxes : [{
        stacked : true,
        ticks : {
          fontColor : 'white',
        },
        gridLines : false,
      }],
      yAxes : [{
        stacked : true,
        ticks : {
          fontColor : 'white',
        },
        gridLines : {
          color : 'white',
        }
      }]
    }
  };
  public RevLabels: Label[] = [];
  public RevColors: Color[] = [
    {
      backgroundColor: "rgba(255,255,255, 1)",
    }
  ];
  public RevChartType = 'bar';
  public RevLegends = false;
  public RevPlugins = [];

  // When tab changes for Outlets registerec.
  CurIndexOutlet = 0;
  tabchangedOutReg(event) {
    this.CurIndexOutlet = event.index;
  }

  //function for getting the sum of the array.
  getSum(aray) {
    let sum= 0;
    for(let i of  aray){
      sum += i;
    }
    return sum;
  }


  //when most and least visted tab changes.
  CurIndexMandL = 0;
  tabchangedMostNLeast(event) {
    this.CurIndexMandL = event.index;
  }


  // When Visits Tab changes .
  CurIndexVisitsDone = 0;
  tabChangeVisits(event) {
    this.CurIndexVisitsDone = event.index;
  }


  //Changing Chart Types 
  ChangeChartType(type : string, card : string) {
    switch(card) {
      case 'MnLChart' : {
        if(this.CurIndexMandL){
          this.LeastOutChartType = type
        }
        else {
          this.MostOutChartType = type
        }
        break;
      }
      case 'VisitsDone' :{
        if(this.CurIndexVisitsDone){
          this.YVisitChartType = type;
        }
        else{
          this.MVisitChartType = type;
        }
        break;
      }
      case 'OutletReg' : {
        if(this.CurIndexOutlet){
          this.YOutRegChartType = type;
        }
        else{
          if(type === 'line'){
            this.MOutRegColors = [{
              backgroundColor : "rgba(242,43,255, 0.3)",
              borderColor : "#F9A1FF"
            }];
          }
          this.MOutRegChartType = type;
        } 
        break;
      }
    }

  }

  //Completion Rate Summary.
  viewSummary = false;
  TotalPlanned :number = 1;
  TotalVisited : number = 1;
  CompletionRate : number = 100;


  //PLANNED VISITS.
  planvisitArray = [1,2,3];


  constructor(private breakpointObserver: BreakpointObserver, private EmpdetailsProvider: EmpDetailsProviderService, private Getservice: MainServiceService) { }





  //PREPARING THE EMPLOYEE DATA SOURCE FOR DISPLAYING EMPLOYEE RELATED INFO.
  public Empdata: EmpDetails;
  EmpName = '';
  EmpRole = '';

  ngOnInit() {

    //Updating the Monthly Registered Outlets.
    this.UpdateData('OutletReg', this.paramsMout, 'MontlyOutlets');

    //Updating the Yearly Registered Outlets.
    this.UpdateData('OutletReg', this.paramsYout, 'YearlyOutlets');
 
    //Updating most Visited And Least Visited OUtlets.
    this.UpdateData('MostAndLeast', {}, 'MostAndLeast');

    //Updating the Monthly Visits Done.
    this.UpdateData("VisitCount", this.paramsMVisits, "MonthlyVisits");
    
    //Updating the Yearly Visits Done.
    this.UpdateData('VisitCount', this.paramsYVisits, "YearlyVisit");

    //Updating the Revenue Collection.
    this.UpdateData('RevenueColl', this.paramsRevenue, "RevenueCollection");

    //Updating the Completion rate stats
    this.UpdateData('CompletionRate', this.paramsCompRate, "CompletionRate");

    //Updating the Expected order and collection stats.
    // this.UpdateData('')

    //Updating the Planned Visits summary
    this.UpdateData('RecentVisit', this.paramsPlannedVisits, "PlannedVSummary");

  }


  ngAfterViewInit() {


    this.EmpdetailsProvider._CheckDetails$.subscribe(
      response => {
        if (response) {
          this.Empdata = this.EmpdetailsProvider.EmpDataSource;
          this.EmpName = this.Empdata.Name;
          this.EmpRole = this.Empdata.RoleName;
        }

        else {
          this.EmpName = this.EmpName;
          this.EmpRole = this.EmpRole;
        }
      }
    );

    this.EmpName = this.EmpdetailsProvider.EmpDataSource.Name;
    this.EmpRole = this.EmpdetailsProvider.EmpDataSource.RoleName;

  }
}
