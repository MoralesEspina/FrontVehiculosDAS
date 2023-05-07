import { Component, OnInit } from '@angular/core';
import { LocalRequestService } from 'src/app/services/localRequest.service';

@Component({
  selector: 'app-local-request-index',
  templateUrl: './local-request-index.component.html',
  styleUrls: ['./local-request-index.component.css']
})
export class LocalRequestIndexComponent implements OnInit {
  public p:number = 1;
  public requestsLocal;
  public username;
  
  constructor(private _requestService:LocalRequestService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('User');
    this.getLocalRequestOnHold();
  }

  getLocalRequestOnHold(){
    this._requestService.getLocalRequest('onHold','6', this.username).subscribe(
      response =>{
        this.requestsLocal = response.data;
        
      }, error =>{
      }
    )
  }
}
