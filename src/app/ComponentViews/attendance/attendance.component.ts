import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, ViewEncapsulation } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceComponent implements OnInit, AfterViewInit {

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

  // dateClass() {
  //   return (date: Date): MatCalendarCellCssClasses => {
  //     if (date.getDate() === 1 || date.getDate() === 20) {
  //       return 'special-date';
  //     } else {
  //       return;
  //     }
  //   };
  // }


  constructor(private empdetails : EmpDetailsProviderService,  private renderer : Renderer2) { }



  ngOnInit(): void {
    this.empdatasource = this.empdetails.EmpDataSource;
    if(this.empdatasource){
      this.EmpName = this.empdatasource['Name'];
    }
  }

  ngAfterViewInit() {
    // const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
   
    // if (buttons) {
    //   Array.from(buttons).forEach(button => {
    //     this.renderer.listen(button, 'click', () => {
    //       alert('Arrow buttons clicked');
    //     });
    //   });
    // }
  }
}
