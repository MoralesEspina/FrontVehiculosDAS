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
  public isLoad: boolean = false;
  public rol;
  public secre: boolean = false;
  
  constructor(private _requestService:LocalRequestService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('User');
    this.rol= localStorage.getItem('rol')
    if(this.rol == 'Secretaria/o'){
      this.secre = true
    };
    this.getLocalRequestOnHold();
  }

  getLocalRequestOnHold(){
    this._requestService.getLocalRequest('onHold','6', this.username).subscribe(
      response =>{
        this.requestsLocal = response.data;
        this.isLoad = true;
      }, error =>{
      }
    )
  }
}
