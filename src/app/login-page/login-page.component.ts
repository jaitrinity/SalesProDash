import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { EmpDetailsProviderService } from '../Services/emp-details-provider.service';
import { MainServiceService } from '../Services/main-service.service';
import { User } from '../Structures/UserModel';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  //SETTING THE SERVICE NAME.
  ServiceName = 'LoginUser';
  params = {
    Username: '',
    Password: ''
  }

  ShowLoading = false;

  constructor(private Mainserv: MainServiceService, private router: Router, private empchecksend : EmpDetailsProviderService) {  }

  // CREATING AN EMPTY USER.
  usermodel = new User('', '');

  //HIDING THE SHOW BUTTON BY DEFAULT.
  hide = true;
  invalid = false;

  //ON SUBMITTING THE FORM .
  OnSubmitting() {
    //code 
    this.ShowLoading = true
    this.params.Username = this.usermodel.username;
    this.params.Password = this.usermodel.password;
    //GETTING THE OBSERVABLE OF MAINSERVICE.
    let Logcheck$ = this.Mainserv.GetService(this.ServiceName, this.params);

    Logcheck$.pipe(
      this.Mainserv.handleErrorPipe(),
      catchError(err => {
        return of([]);
      })
      // finalize(() => this.ShowLoading = false)
    ).subscribe(
      res => {
        if(res) {
          let datarecieved = this.Mainserv.HandleResponse(res);
          if (datarecieved) {
            localStorage.setItem('Token', datarecieved['token']);
            this.router.navigate(['/Home']);
            this.empchecksend.checkDetails('check');
          }
        }
      },
      err => console.log(err),
      () => {
        this.ShowLoading = false;
      }
    );


  }

  ngOnInit(): void {
  }

}
