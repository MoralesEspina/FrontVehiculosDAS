import { Component, OnInit } from '@angular/core';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';

@Component({
  selector: 'app-exterior-request-index',
  templateUrl: './exterior-request-index.component.html',
  styleUrls: ['./exterior-request-index.component.css']
})
export class ExteriorRequestIndexComponent implements OnInit {
  public exteriorRequest;
  public p:number = 1;
  public username;
  public rol;
  public secre: boolean = false;
  public isLoad: boolean = false;
  constructor(private _exteriorRequestService:ExteriorRequestService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('User');
    this.rol= localStorage.getItem('rol')
    if(this.rol == 'Secretaria/o'){
      this.secre = true
    };
    this.getExteriorRequestOnHold();
    
  }

  getExteriorRequestOnHold(){
    console.log(this.username)
    this._exteriorRequestService.getExteriorRequest('onHold','6',this.username).subscribe(
      response =>{
        this.exteriorRequest = response.data;
        this.isLoad = true;
      }, error =>{
      }
    )
  }

}
