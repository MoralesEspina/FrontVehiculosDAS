import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles-index',
  templateUrl: './vehicles-index.component.html',
  styleUrls: ['./vehicles-index.component.css']
})
export class VehiclesIndexComponent implements OnInit {

  public p:number = 1;
  public vehicles;
  public result;
  public data_response;
  public isLoad: boolean = false;

  constructor(private _vehicleService: VehicleService,
              private _sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(){
    this._vehicleService.getVehicles('').subscribe(
      response =>{
        this.vehicles = response.data;
        this.isLoad = true;
      }, error =>{
        this._sweetAlertService.error('Parece que algo salio mal :(');
      }
    )
  }

  deleteVehicle(id){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._vehicleService.deleteOneVehicle(id).subscribe(data => {
          this._sweetAlertService.deleteOneConfirmation('Eliminado correctamente');
          this.getVehicles();
        }, error => {
          this._sweetAlertService.deleteOneError('No se pudo eliminar el vehiculo',error.error.data.message);
          this.getVehicles();
        });
      }
    })
  }
}
