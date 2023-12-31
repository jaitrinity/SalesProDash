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


  private _CheckDetails = new Subject<boolean>();
  _CheckDetails$ = this._CheckDetails.asObservable();

  SendValidation(message : EmpDetails){
    this._EmpDetailsOSub.next(message);
    this.EmpDataSource = message;
    this._CheckDetails.next(true);
  } 

  constructor() { }
}
