import { Component, OnInit } from '@angular/core';
import { ExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { InfoService } from 'src/app/services/info.service';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';

@Component({
  selector: 'app-exterior-request-mant',
  templateUrl: './exterior-request-mant.component.html',
  styleUrls: ['./exterior-request-mant.component.css']
})
export class ExteriorRequestMantComponent implements OnInit {

public exteriorRequest;
public types;
public status;
public gas;
public editing: boolean = false;

  constructor(private _infoService:InfoService,
              private _exteriorRoutesService:ExteriorRequestService) {
    this.exteriorRequest = new ExteriorRequestI('','','','','','','',0,0,'','','');
  }

  ngOnInit(): void {
    this.getTypes();
    this.getStatus();
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
    this._infoService.getTypes().subscribe(
      response => {
        this.types = response.data;
      }, error => {
      }
    )
  }

  createNewExteriorRequest(ExteriorForm){
    if (this.editing) {
      const exteriorRequest: ExteriorRequestI = {

        requesting_unit: ExteriorForm.value.requesting_unit,
        commission_manager: ExteriorForm.value.commission_manager,
        date_request: ExteriorForm.value.date_request,
        objective_request: ExteriorForm.value.objective_request,
        duration_days: ExteriorForm.value.duration_days,
        phoneNumber: ExteriorForm.value.phoneNumber,
        observations: ExteriorForm.value.observations,
        provide_fuel: ExteriorForm.value.provide_fuel,
        provide_travel_expenses: ExteriorForm.value.provide_travel_expenses,
        plate_vehicle: ExteriorForm.value.plate_vehicle,
        pilot_name: ExteriorForm.value.pilot_name,
        reason_rejected: ExteriorForm.value.reason_rejected,
      }
      if (ExteriorForm.valid) {
        this._exteriorRoutesService.updateOneRequestExterior(exteriorRequest, this._exteriorRoutesService).subscribe(
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
      const exteriorRequest: ExteriorRequestI = {
        requesting_unit: ExteriorForm.value.requesting_unit,
        commission_manager: ExteriorForm.value.commission_manager,
        date_request: ExteriorForm.value.date_request,
        objective_request: ExteriorForm.value.objective_request,
        duration_days: ExteriorForm.value.duration_days,
        phoneNumber: ExteriorForm.value.phoneNumber,
        observations: ExteriorForm.value.observations,
        provide_fuel: ExteriorForm.value.provide_fuel,
        provide_travel_expenses: ExteriorForm.value.provide_travel_expenses,
        plate_vehicle: ExteriorForm.value.plate_vehicle,
        pilot_name: ExteriorForm.value.pilot_name,
        reason_rejected: ExteriorForm.value.reason_rejected,
    }
    console.log("Se registro el vehiculo correctamente");
    if (ExteriorForm.valid) {
      this._exteriorRoutesService.createNewRequestExterior(exteriorRequest).subscribe(
        response => {
          console.log("Se registro el vehiculo correctamente");
          this.exteriorRequest = new ExteriorRequestI('','','','','','','',0,0,'','','');
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
