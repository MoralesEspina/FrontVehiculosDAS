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
  constructor(private _exteriorRequestService:ExteriorRequestService) { }

  ngOnInit(): void {
    this.getExteriorRequestOnHold();
  }

  getExteriorRequestOnHold(){
    this._exteriorRequestService.getExteriorRequest('onHold','6').subscribe(
      response =>{
        this.exteriorRequest = response.data;
      }, error =>{
      }
    )
  }

}
