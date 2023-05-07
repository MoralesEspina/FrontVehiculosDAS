import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseI } from 'src/app/models/response.interface';
import { DenyTripsI } from 'src/app/models/tripsdate.interface';
import { ErrorsService } from 'src/app/services/errors.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { TripsService } from 'src/app/services/trips.service';
import Swal from 'sweetalert2';

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
  public isLoad: boolean = false;
  public statusTrips;
  public data_response;

  constructor(private _tripServicetab: TripsService,
    private _sweetAlertService: SweetAlertService,
    _tripService: TripsService,
    private _errorService:ErrorsService,
    private _router:Router,
    ) {
      this.statusTrips = new ResponseI('','')
     }

  ngOnInit(): void {
      this.getTripsActives();
  }

  getTripsActives(){
    this._tripServicetab.getTrips('actives','exterior').subscribe(
      response =>{
        this.trip_exterior = response.data;
      }, error =>{

      }
    )
    this._tripServicetab.getTrips('actives','local').subscribe(
      response =>{
        this.trip_local = response.data;
        this.isLoad = true;
      }, error =>{

      }
    )
  }

  reasonDenyExterior(reason_rejected){
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Razon de Cancelación:',
      html: reason_rejected,
      showConfirmButton: true,
    })
  }

  reasonDenyLocal(reason_rejected){
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Razon de Cancelación:',
      html: reason_rejected,
      showConfirmButton: true,
    })
  }


  
}
