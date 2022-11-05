import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleI } from 'src/app/models/vehicle.interface';
import { InfoService } from 'src/app/services/info.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ResponseI } from 'src/app/models/response.interface';
import { ErrorsService } from 'src/app/services/errors.service';
import {Router} from '@angular/router';

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
  public data_response;

  constructor(
    private _infoService: InfoService,
    private _vehicleService: VehicleService,
    private _route: ActivatedRoute,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private router:Router
  ) {
    this.vehicle = new VehicleI('', '', '', '', '', '', '', '','','');
    this.data_response = new ResponseI('', '')
  }

  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.loadVehicle();
    if (this.id_entrada) {
    } else {
      this.getTypes();
      this.getStatus();
    }
  }

  loadVehicle() {
    if (this.id_entrada) {
      this.editing = true;
      this._vehicleService.getOneVehicle(this.id_entrada).subscribe(
        response => {
          this.vehicle = response.data[0]
          this.getTypes();
          this.getStatus();
        },
        error => {
          this._sweetAlertService.warning('No se pudieron cargar los datos correctamente');
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
        this._sweetAlertService.warning('No se pudieron cargar los tipos correctamente');
      }
    )
  }

  getStatus() {
    this._infoService.getStatusForVehicles().subscribe(
      response => {
        this.type_status = response.data;
      }, error => {
        this._sweetAlertService.warning('No se pudieron cargar los status correctamente');
      }
    )
  }

  createNewVehicle(vehicleForm) {
    const vehicle: VehicleI = {
      vin: this.editing ? this.id_entrada : vehicleForm.value.vin,
      plate: vehicleForm.value.plate,
      type: vehicleForm.value.type,
      brand: vehicleForm.value.brand,
      model: vehicleForm.value.model,
      km: vehicleForm.value.km,
      gas: vehicleForm.value.gas,
      status: vehicleForm.value.status,
      cylinders: vehicleForm.value.cylinders,
      color: vehicleForm.value.color,
    }

    if (!vehicleForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }

    if (this.editing) {
      this._vehicleService.updateOneVehicle(vehicle, this.id_entrada).subscribe(
        data => {
          this._sweetAlertService.createAndUpdate('Editado correctamente');
          this.router.navigate(['vehicles']);
        },
        error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        })
    } else {
      this.editing = false;
      this._vehicleService.createNewVehicle(vehicle).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro el vehiculo correctamente');
          this.vehicle = new VehicleI('', '', '', '', '', '', '', '','','');
          this.router.navigate(['vehicles']);
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    }
  }
}
