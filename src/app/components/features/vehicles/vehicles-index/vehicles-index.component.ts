import { Component, OnInit } from '@angular/core';
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
  constructor(private _vehicleService: VehicleService,) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(){
    this._vehicleService.getVehicles().subscribe(
      response =>{
        console.log(response)
        this.vehicles = response.data;
      }, error =>{

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
          Swal.fire(
            'Eliminado!',
            'Vehiculo Eliminado con Exito',
            'success'
          )
          this.getVehicles();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'No se ha podido eliminar el producto',
            text: error.error.data,
          })
        });
      }
    })
  }
}
