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
  public p2:number = 1;
  public requestsLocal;
  public username;
  rol:any;
  public isLoad: boolean = false;

  constructor(private _exteriorRequestService:ExteriorRequestService, private _requestService:LocalRequestService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('User');
    this.rol = localStorage.getItem('rol');
    this.getRequests();
  }

  getRequests(){
    this._requestService.getLocalRequest('','',this.username).subscribe(
      response =>{
        this.requestsLocal = response.data;
      }, error =>{
      }
    )
    this._exteriorRequestService.getExteriorRequest('','',this.username).subscribe(
      response =>{
        this.exteriorRequest = response.data;
        this.isLoad = true;
      }, error =>{
      } 
    )
    
  }
  
}
