import { Component, OnInit } from '@angular/core';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { LocalRequestService } from 'src/app/services/localRequest.service';

@Component({
  selector: 'app-history-request',
  templateUrl: './history-request.component.html',
  styleUrls: ['./history-request.component.css']
})
export class HistoryRequestComponent implements OnInit {
  public exteriorRequest;
  public p:number = 1;
  public requestsLocal;
  constructor(private _exteriorRequestService:ExteriorRequestService, private _requestService:LocalRequestService) { }

  ngOnInit(): void {
    this.getExteriorRequest();
    this.getLocalRequest();
  }


  getExteriorRequest(){
    this._exteriorRequestService.getExteriorRequest().subscribe(
      response =>{
        this.exteriorRequest = response.data;
      }, error =>{
      }
    )
  }
  getLocalRequest(){
    this._requestService.getLocalRequest().subscribe(
      response =>{
        this.requestsLocal = response.data;
      }, error =>{
      }
    )
  }
}
