import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips-history',
  templateUrl: './trips-history.component.html',
  styleUrls: ['./trips-history.component.css']
})
export class TripsHistoryComponent implements OnInit {
  public p:number = 1;
  public p2:number = 1;
  public trip_exterior;
  public trip_local;
  public localRequest;
  public exteriorRequest;
  public statusL: boolean = false;
  public statusE: boolean = false;

  constructor(private _tripServicetab: TripsService,) { }

  ngOnInit(): void {
      this.getTripsExteriorOnHold();
      this.getTripsLocalOnHold();
  }

  getTripsExteriorOnHold(){
    this._tripServicetab.getTripsExteriorOnHold().subscribe(
      response =>{
        this.trip_exterior = response.data;

        this.exteriorRequest = response.data.request[0]
        if (this.exteriorRequest.status == 11) {
          this.statusE = true;
        }
      }, error =>{

      }
    )
  }

  getTripsLocalOnHold(){
    this._tripServicetab.getTripsLocalOnHold().subscribe(
      response =>{
        this.trip_local = response.data;

        this.localRequest = response.data.request[0]
        if (this.localRequest.status == 11) {
          this.statusL = true;
        }
      }, error =>{

      }
    )
  }

}
