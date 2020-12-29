import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MapViewComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendar: MatCalendar<MomentDateAdapter>;
  selectedDate: Moment;

  //empname
  empdatasource : any;
  EmpName : string = '';

  monthSelected(date) {
    alert(`Selected: ${date}`);
  }

  dateChanged(date) {
  alert(`Selected: ${date}`);
}

  constructor(private empdetails : EmpDetailsProviderService) { }

  ngOnInit(): void {
    this.empdatasource = this.empdetails.EmpDataSource;
    if(this.empdatasource){
      this.EmpName = this.empdatasource['Name'];
    }

  }

  ngAfterViewInit() {

    }

}
