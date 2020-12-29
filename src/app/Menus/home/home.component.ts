import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EmpDetails } from 'src/app/Structures/EmpDetailStruct';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
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

  constructor(private breakpointObserver: BreakpointObserver, private EmpdetailsProvider : EmpDetailsProviderService) {}


  //PREPARING THE EMPLOYEE DATA SOURCE FOR DISPLAYING EMPLOYEE RELATED INFO.
  public Empdata : EmpDetails;
  EmpName = '';
  EmpRole = '';


  ngAfterViewInit() {


    this.EmpdetailsProvider._CheckDetails$.subscribe(
      response => {
        if(response){
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

  }
}
