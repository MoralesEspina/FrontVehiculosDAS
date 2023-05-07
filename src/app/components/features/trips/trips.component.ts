import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResponseI } from 'src/app/models/response.interface';
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
  public statusTrips;
  public isLoad: boolean = false;


  constructor(private _tripServicetab: TripsService,
    private _route: ActivatedRoute,
    private _sweetAlertService: SweetAlertService,
    private _errorService:ErrorsService,
    private _router:Router,
    ) {
      this.statusTrips = new ResponseI('','')
    }

  ngOnInit(): void {
      this.getTripsOnHold();
  }

  getTripsOnHold(){
    this._tripServicetab.getTrips('onHold','exterior').subscribe(
      response =>{
        this.trip_exterior = response.data;
      }, error =>{

      }
    )
    this._tripServicetab.getTrips('onHold','local').subscribe(
      response =>{
        this.trip_local = response.data;
        this.isLoad = true;
      }, error =>{

      }
    )
  }

  initializeTrips(id){
    this.statusTrips.status = 11;
    this._tripServicetab.updateTrips(id,this.statusTrips).subscribe(
      data => {
        this._sweetAlertService.createAndUpdate('Viaje iniciado correctamente');
        location.reload();
      },
      error => {
        this.data_response = error;
        this._errorService.error(this.data_response)
      })
  }
  finalizeTrips(id){
    this.statusTrips.status = 13;
    this._tripServicetab.updateTrips(id,this.statusTrips).subscribe(
      data => {
        this._sweetAlertService.createAndUpdate('Viaje finalizado correctamente');
        location.reload();
      },
      error => {
        this.data_response = error;
        this._errorService.error(this.data_response)
      })
  }

}
