import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { catchError, map, retryWhen, shareReplay } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { MainServiceService } from '../Services/main-service.service';
import { Router } from '@angular/router';
import { EmpDetailsProviderService } from '../Services/emp-details-provider.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class MainScreenComponent implements OnInit{

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private breakpointObserver: BreakpointObserver, private Mainserv : MainServiceService, private router : Router, private empdetailsprovider : EmpDetailsProviderService) {}

  //Toogle Variable for the sidenav.
  ToggleVariable = true;
  //Toogle variable for searchbar.
  ToggledSearch = false;
  //setting the service name and the parameters.
  ServiceName = 'GetEmpInfo';
  parameters = {};

  //logout function
  Logout() {
    localStorage.clear();
    this.router.navigate(["/Login"]);
  }


  //GETTING THE EMPLOYEE INFO AND SETTING IT TO THE SERVICE DATASOURCE.
  ngOnInit () {
    let _EmpAndTokenCheck$ = this.Mainserv.GetService(this.ServiceName, this.parameters);

    _EmpAndTokenCheck$.pipe(
      this.Mainserv.handleErrorPipe(),
      catchError(err => {
        return of([]);
      })
    ).subscribe(
      res => {
        if(res){
          let datarecieved = this.Mainserv.HandleResponse(res);
          if(datarecieved == 'Token Invalid'){
            this.router.navigate(['/Login']);
          }
          else if(datarecieved) {
            let empdetails = datarecieved['EmpDetails'];
            this.empdetailsprovider.SendValidation(empdetails);
          }
        }
      err => console.log(err);
      () => console.log("Http Response Complete");
      }
    )
  }

}
