import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleI } from 'src/app/models/vehicle.interface';
import { InfoService } from 'src/app/services/info.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles-mant.component.html',
  styleUrls: ['./vehicles-mant.component.css']
})
export class VehiclesMantComponent implements OnInit {

  //TODO ARRIBA DEL CONSTRUCTOR SE DECLARAN VARIABLES
  //TODO DECLARAMOS LA DEL NG MODEL LE COLOCAMOS COMO SE LLAMA NUESTRO COMPONENTE
  public vehicle;
  public types;
  public type_status;
  public editing: boolean = false;
  public id_entrada;

  constructor(private _infoService:InfoService,
              private _vehicleService:VehicleService,
              private _route: ActivatedRoute
  ){

    this.vehicle = new VehicleI('','','','',0,0,'',0);
  }

  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.loadVehicle();
    if (this.id_entrada) {

    }else{
        this.getTypes();
        this.getStatus();
    }

  }

  loadVehicle(){
    if (this.id_entrada) {
      this.editing = true;
      this._vehicleService.getOneVehicle(this.id_entrada).subscribe(
        response => {
          this.vehicle = response.data[0]
          this.getTypes();
          this.getStatus();
        },
        error => {
        }
      )
    } else {
      this.editing = false;
    }
  }

  getTypes() {
    this._infoService.getTypes().subscribe(
      response => {
        this.types = response.data;
      }, error => {
      }
    )
  }

  getStatus() {
    this._infoService.getStatus().subscribe(
      response => {
        this.type_status = response.data;
      }, error => {
      }
    )
  }

  createNewVehicle(vehicleForm){
    if (this.editing) {
      const vehicle: VehicleI = {
        vin: this.id_entrada,
        plate: vehicleForm.value.plate,
        type: vehicleForm.value.type,
        brand: vehicleForm.value.brand,
        model: vehicleForm.value.model,
        km: vehicleForm.value.km,
        gas: vehicleForm.value.gas,
        status: vehicleForm.value.status,
      }
      if (vehicleForm.valid) {
        this._vehicleService.updateOneVehicle(vehicle, this.id_entrada).subscribe(
          data => {
           console.log("Vehiculo actualizado correctamente") ;
          },
          error => {
            console.log(error.error.data)
          })
      } else {
        console.log('Complete Correctamente el Formulario');
      }
    } else {
      this.editing = false;
      const vehicle: VehicleI = {
      vin: vehicleForm.value.vin,
      plate: vehicleForm.value.plate,
      type: vehicleForm.value.type,
      brand: vehicleForm.value.brand,
      model: vehicleForm.value.model,
      km: vehicleForm.value.km,
      gas: vehicleForm.value.gas,
      status: vehicleForm.value.status,
    }
    console.log("Se registro el vehiculo correctamente");
    if (vehicleForm.valid) {
      this._vehicleService.createNewVehicle(vehicle).subscribe(
        response => {
          console.log("Se registro el vehiculo correctamente");
          this.vehicle = new VehicleI('','','','',0,0,'',0);
        }, error => {
          console.log(error.error.data)
        }
      );
    } else {
        console.log("Complete Correctamente el Formulario");
    }
  }
}
}
