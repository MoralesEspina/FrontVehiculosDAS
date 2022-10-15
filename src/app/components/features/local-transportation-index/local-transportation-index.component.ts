import { Component, OnInit } from '@angular/core';
import { RequestlocalService } from 'src/app/services/requestlocal.service';

@Component({
  selector: 'app-local-transportation-index',
  templateUrl: './local-transportation-index.component.html',
  styleUrls: ['./local-transportation-index.component.css']
})
export class LocalTransportationIndexComponent implements OnInit {

 
  public p:number = 1;
  public requestsLocal;
  constructor(private _requestService: RequestlocalService,) { }

  ngOnInit(): void {
    this.getrequestLocal();
  }

  getrequestLocal(){
    this._requestService.getrequestLocal().subscribe(
      response =>{
        console.log(response)
        this.requestsLocal = response.data;
      }, error =>{

      }
    )
  }
}
