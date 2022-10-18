import { Component, OnInit } from '@angular/core';
import { RequestlocalService } from 'src/app/services/requestLocal.service';

@Component({
  selector: 'app-local-request-index',
  templateUrl: './local-request-index.component.html',
  styleUrls: ['./local-request-index.component.css']
})
export class LocalRequestIndexComponent implements OnInit {


  public p:number = 1;
  public requestsLocal;
  constructor(private _requestService: RequestlocalService,) { }

  ngOnInit(): void {
    this.getRequestLocal();
  }

  getRequestLocal(){
    this._requestService.getRequestLocal().subscribe(
      response =>{
        console.log(response)
        this.requestsLocal = response.data;
      }, error =>{

      }
    )
  }
}
