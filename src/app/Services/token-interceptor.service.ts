import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector : Injector) { }

  intercept(req , next) {

    let MainService = this.injector.get(MainServiceService);
    let tokenizedreq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${MainService.getToken()}`
      }
    })

    return next.handle(tokenizedreq);
  }
}
