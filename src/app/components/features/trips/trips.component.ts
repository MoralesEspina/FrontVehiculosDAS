import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { VoucherDieselI } from 'src/app/models/voucher.interface';
import { ErrorsService } from 'src/app/services/errors.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { TripsService } from 'src/app/services/trips.service';
import Swal from 'sweetalert2';
import { VoucherDieselComponent } from '../voucher/voucher-diesel/voucher-diesel.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  public p:number = 1;
  public trip_exterior;
  public trip_local;
  public id_entrada;
  public data_response;

  constructor(private _tripServicetab: TripsService,

    private _sweetAlertService: SweetAlertService,
   private _VoucherDieselComponent: VoucherDieselComponent,
   private router: ActivatedRoute,
   private _router:Router,
   private _errorService: ErrorsService,) { }

  ngOnInit(): void {
      this.getTripExterior();
      this.getTripLocal();
      this.id_entrada = this.router.snapshot.params['id'];
  }

  getTripExterior(){
    this._tripServicetab.getTripExterior().subscribe(
      response =>{
        this.trip_exterior = response.data;
      }, error =>{

      }
    )
  }

  getTripLocal(){
    this._tripServicetab.getTripLocal().subscribe(
      response =>{
        this.trip_local = response.data;
      }, error =>{

      }
    )
  }


  // async voucher(){
  //   const { value: text } = await Swal.fire({
  //     input: 'textarea',
  //     inputLabel: 'Indique el motivo del rechazo:',
  //     inputPlaceholder: 'Escribe acá el motivo...',
  //     inputAttributes: {
  //       'aria-label': 'Type your message here'
  //     },

  //     showCancelButton: true
  //   })

  //   if (!text) {
  //     this._sweetAlertService.warning('Debe ingresar un motivo');
  //     return
  //   }
  //   const deny:VoucherDieselI = {
  //      date:"",
  //      cost:"",
  //      id_vehicle: "",
  //      comission_to:"",
  //      objective:"",
  //      id_pilot:"",
  //      km_gallon:"",
  //      service_of: "",
  //      comission_date:"",
  //      km_to_travel:"",
  //      type: "",
  //      brand: "",
  //      model: "",
  //      color: "",
  //      plate: "",
  //      fullname:"",
  //      dpi:"",
  //   }
  //   this._VoucherDieselComponent.createNewVoucherDisel(deny, this.id_entrada).subscribe(
  //     response => {
  //       this._sweetAlertService.createAndUpdate('Se denego correctamente la solicitud');
  //       this._router.navigate(['Vouchertable'])
  //       setTimeout(() => {
  //         window.location.reload();
  //      }, 1000);

  //     }, error => {
  //       console.log(error)
  //       this.data_response = error;
  //       this._errorService.error(this.data_response);
  //     }
  //   );
  // }
}
