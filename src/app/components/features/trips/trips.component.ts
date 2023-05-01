import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  public p:number = 1;
  public p2:number = 1;
  public trip_exterior;
  public trip_local;
  public localRequest;
  public exteriorRequest;
  public statusL: boolean = false;
  public data_response;
  public statusE: boolean = false;

  constructor(private _tripServicetab: TripsService,
    private _route: ActivatedRoute,
    private _sweetAlertService: SweetAlertService,
    private _errorService:ErrorsService,
    private _router:Router,
    ) { }

  ngOnInit(): void {
      this.getTripsExteriorOnHold();
      this.getTripsLocalOnHold();
  }

  getTripsExteriorOnHold(){
    this._tripServicetab.getTrips('onHold','exterior').subscribe(
      response =>{
        this.trip_exterior = response.data;
      }, error =>{

      }
    )
  }

  getTripsLocalOnHold(){
    this._tripServicetab.getTrips('onHold','local').subscribe(
      response =>{
        this.trip_local = response.data;
      }, error =>{

      }
    )
  }
  
  initializeTrips(id){
    this._tripServicetab.updateTrips(id,'11').subscribe(
      data => {
        this._sweetAlertService.createAndUpdate('Viaje iniciado correctamente');
      },
      error => {
        this.data_response = error;
        this._errorService.error(this.data_response)
      })
  }
  finalizeTrips(id){
    this._tripServicetab.updateTrips(id,'13').subscribe(
      data => {
        this._sweetAlertService.createAndUpdate('Viaje finalizado correctamente');
      },
      error => {
        this.data_response = error;
        this._errorService.error(this.data_response)
      })
  }

}
