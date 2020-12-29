import { Component, OnInit } from '@angular/core';
import { EmpDetailsProviderService } from 'src/app/Services/emp-details-provider.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  //empname
  empdatasource : any;
  EmpName : string = '';
  

  constructor(private empdetails : EmpDetailsProviderService) { }

  ngOnInit(): void {
    this.empdatasource = this.empdetails.EmpDataSource;
    if(this.empdatasource){
      this.EmpName = this.empdatasource['Name'];
    }
  }

}
