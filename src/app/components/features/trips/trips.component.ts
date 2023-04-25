import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  public p:number = 1;
  public trip_exterior;
  public trip_local;

  constructor(private _tripServicetab: TripsService,) { }

  ngOnInit(): void {
      this.getTripsExteriorOnHold();
      this.getTripsLocalOnHold();
  }

  getTripsExteriorOnHold(){
    this._tripServicetab.getTripsExteriorOnHold().subscribe(
      response =>{
        this.trip_exterior = response.data;
      }, error =>{

      }
    )
  }

  getTripsLocalOnHold(){
    this._tripServicetab.getTripsLocalOnHold().subscribe(
      response =>{
        this.trip_local = response.data;
      }, error =>{

      }
    )
  }

}
