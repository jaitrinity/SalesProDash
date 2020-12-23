import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EmpDetails } from '../Structures/EmpDetailStruct';

@Injectable({
  providedIn: 'root'
})
export class EmpDetailsProviderService {
  //Employee Details data Source.
  public EmpDataSource : EmpDetails;

  private _EmpDetailsOSub = new Subject<EmpDetails>();
  _GetEmpDetails$ = this._EmpDetailsOSub.asObservable();


  private _CheckDetails = new Subject<String>();
  _CheckDetails$ = this._EmpDetailsOSub.asObservable();

  SendValidation(message : EmpDetails){
    this._EmpDetailsOSub.next(message);
    this.EmpDataSource = message;
  } 

  checkDetails(message : string){
    this._CheckDetails.next(message);
  }

  constructor() { }
}
