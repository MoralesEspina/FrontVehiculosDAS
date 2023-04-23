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
    this.getRequestLocal();
  }


  getExteriorRequest(){
    this._exteriorRequestService.getRequestExterior().subscribe(
      response =>{
        this.exteriorRequest = response.data;
      }, error =>{
      }
    )
  }
  getRequestLocal(){
    this._requestService.getRequestLocal().subscribe(
      response =>{
        this.requestsLocal = response.data;
      }, error =>{
      }
    )
  }
}
