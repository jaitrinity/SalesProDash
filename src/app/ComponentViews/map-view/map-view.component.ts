import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCalendar } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Moment, MomentInput } from 'moment';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { NotifierService } from 'src/app/Services/notifier.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MapViewComponent implements OnInit, AfterViewInit {

  @ViewChild('calendarMap') calendar: MatCalendar<MomentDateAdapter>;
  selectedDate: Moment;
  Vcount = 5;

  //FUNCTION FOR HANDLIND THE DATA UPDATION.
  UpdateData(flag : string) {
    switch(flag) {
      case 'OutRegistered' : {
        let Out$ = this.dataserv.GetService(this.ServiceNameRegOut, this.ParametersFrOut);
        Out$.pipe(
          this.dataserv.handleErrorPipe(),
        ).subscribe(
          res => {
            let datarecieved = this.dataserv.HandleResponse(res);
            if(datarecieved === 'Token Invalid'){
              //When the data is invalid.
              this.router.navigate(['/Login']);
            }
            else if(datarecieved){
              this.RegSub = datarecieved['Sub_Dealer'];
              this.RegDist = datarecieved['Distributor'];
              this.RegDea = datarecieved['Dealer'];
              this.RegOff = datarecieved['Office'];
              this.RegArchi = datarecieved['Architect'];
              this.RegBuil = datarecieved['Builder'];
              this.RegCont = datarecieved['Contractor'];
              this.RegPlumb = datarecieved['Plumber'];
              this.Regproj = datarecieved['Project'];
              this.RegPros = datarecieved['Prospect'];
              this.ButtonObj = datarecieved['OutNames'];
            }

          }
        );
        break;
      }
      case 'Attendance' : {
        let attend$ = this.dataserv.GetService(this.ServiceNameFrAttend, this.ParametersFrAttend);
        attend$.pipe(
          this.dataserv.handleErrorPipe(),
        ).subscribe(
          res => {
            let datarecieved = this.dataserv.HandleResponse(res);
            if (datarecieved === 'Token Invalid') {
              this.router.navigate(['/Login']);
            }
            else if(datarecieved === 'NO_ATTENDANCE'){
              console.log(datarecieved);
              this.AttendanceObject = "NO_ATTENDANCE";
              this.notifier.ShowNotification('500', 'NO_ATTENDANCE', 'OK');
            }
            else if(this.AttendanceObject = datarecieved['Attendance']){
              if(this.AttendanceObject['Start_time']){
                this.Start_time = this.AttendanceObject.Start_time;
              }
              else{
                this.Start_time = '09:00:00';
              }

              if(this.AttendanceObject['Stop_time']){
                this.Stop_time = this.AttendanceObject.Stop_time;
              }
              else{
                this.Stop_time = '18:30:30';
              }
              
              this.Start_Cords = this.AttendanceObject.start_cords;
              this.Stop_Cords = this.AttendanceObject.stop_cords;

            }
          }
        )
      }
      case 'Visits' : {

      }
    }
  }

  //Properties for Getting Registered OUtlets By an employee.
  ServiceNameRegOut = 'OutletLatLong';
  ParametersFrOut = {};

  RegSub = [];
  RegDea = [];
  RegCont = [];
  RegOff = [];
  RegArchi = [];
  RegBuil = [];
  RegPros = [];
  RegPlumb = [];
  Regproj = [];
  RegDist = [];

  ButtonObj = [];

  //Properties for Getting Ateendance Data.
  ddate = new Date();
  tdate = this.ddate.getDate();
  tmonth = this.ddate.getMonth() + 1;
  tyear = this.ddate.getFullYear();
  ServiceNameFrAttend = 'AttendMap';
  ParametersFrAttend = {
    Date : this.tyear + '-' + this.tmonth + '-' + this.tdate
  }
  AttendanceObject : any;
  Start_Cords : any;
  Stop_Cords : any;
  Start_time : any;
  Stop_time : any;
  

  //Function for displaying the outlets.
  NocordiOuts = [];
  ShowOutlets(type : number){
    this.OutletMarkerCords = [];
    switch(type) {
      case 0 : {
        if(this.RegSub.length){
          this.Addcordinates(this.RegSub);
        }else {
          this.notifier.ShowNotification('404', "No Sub Dealers Registered", 'Dismiss');
        }
        break;
      }
      case 1 : {
        if(this.RegCont.length){
          this.Addcordinates(this.RegCont);
        }else {
          this.notifier.ShowNotification('404', "No Contractors Registered", 'Dismiss');
        }
        break;
      }
      case 2 : {
        if(this.RegOff.length){
          this.Addcordinates(this.RegOff);
        }else {
          this.notifier.ShowNotification('404', "No Office Registered", 'Dismiss');
        }
        break;
      }
      case 3 : {
        if(this.RegArchi.length){
          this.Addcordinates(this.RegArchi);
        }else {
          this.notifier.ShowNotification('404', "No Offices Registered", 'Dismiss');
        }
        break;
      }
      case 4 : {
        if(this.RegBuil.length){
          this.Addcordinates(this.RegBuil);
        }else {
          this.notifier.ShowNotification('404', "No Builders Registered", 'Dismiss');
        }
        break;
      }
      case 5 : {
        if(this.RegPros.length){
          this.Addcordinates(this.RegPros);
        }else {
          this.notifier.ShowNotification('404', "No Prospects Registered", 'Dismiss');
        }
        break;
      }
      case 6 : {
        if(this.RegPlumb.length){
          this.Addcordinates(this.RegPlumb);
        }else {
          this.notifier.ShowNotification('404', "No Plumbers Registered", 'Dismiss');
        }
        break;
      }
      case 7 : {
        if(this.Regproj.length){
          this.Addcordinates(this.Regproj);
        }else {
          this.notifier.ShowNotification('404', "No Project Sites Registered", 'Dismiss');
        }
        break;
      }
      case 8 : {
        if(this.RegDea.length){
          this.Addcordinates(this.RegDea);
        }else {
          this.notifier.ShowNotification('404', "No Dealers Registered", 'Dismiss');
        }
        break;
      }
      case 9 : {
        if(this.RegDist.length){
          this.Addcordinates(this.RegDist);
        }else {
          this.notifier.ShowNotification('404', "No Distributers Registered", 'Dismiss');
        }
        break;
      }
    };

    this.clearMarkers();

    for (let i = 0; i < this.OutletMarkerCords.length; i++) {
      this.addMarkerwithTimeout(this.OutletMarkerCords[i], "Nothing" , i * 200);
    }

  }
  //fucntion for adding coordiantes to the array.
  Addcordinates(curout : any) {
    for(let outlets of curout){
      if(outlets['Latitude']!= 0 && outlets['Longitude'] != 0){
        let cord: google.maps.LatLngLiteral = {
          lat: parseFloat(outlets.Latitude),
          lng: parseFloat(outlets.Longitude)
        };
        this.OutletMarkerCords.push(cord);
      }
      else {
        this.NocordiOuts.push({
          Registration_id : outlets.RegistrationId,
          Dealer_Code : outlets.DealerCode
        });
      }
    };
  }

  //FUNCTION FOR ADDING THE MARKER TO THE MAP
  OutletMarkerCords : google.maps.LatLngLiteral[] = [];
  OutletMarkerObjecs = [];
  VisitMarker = [];

  addMarkerwithTimeout(cords, Type : string, timeout : number) {
    window.setTimeout(() => {
      this.OutletMarkerObjecs.push(
        new google.maps.Marker({
          position: cords,
          map: this.map,
          animation: google.maps.Animation.DROP,
        })
      );
    }, timeout);
  };

  clearMarkers() {
    for (let i = 0; i < this.OutletMarkerObjecs.length; i++) {
      this.OutletMarkerObjecs[i].setMap(null);
    }
    this.OutletMarkerObjecs = [];
  }


  //empname
  empdatasource : any;
  EmpName : string = '';

  dateChanged(date ) {
    let dateclicked = (date).format('YYYY-MM-DD');
    this.ParametersFrAttend.Date = dateclicked;
    this.UpdateData('Attendance');
    // this.UpdateData('Visits');
  }


  //SETTING THE PROPERTIES OF THE MAP
  public map : google.maps.Map;

  constructor(private empdetails : EmpDetailsProviderService, private dataserv : MainServiceService, private router : Router, private notifier : NotifierService) { }

  ngOnInit(): void {
    this.empdatasource = this.empdetails.EmpDataSource;
    if(this.empdatasource){
      this.EmpName = this.empdatasource['Name'];
    }

    //UPDATING THE OUTLETS REGISTERED BY THE LOGGED IN EMPLOYEE.
    this.UpdateData('OutRegistered');
    this.UpdateData('Attendance');



    var mapArea = document.getElementById('GoogleMap');
    const mapProperties = {
      center : new google.maps.LatLng(23.1992332, 78.829829),
      zoom : 10,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(mapArea, mapProperties);

  }

  ngAfterViewInit() {


  }

}
