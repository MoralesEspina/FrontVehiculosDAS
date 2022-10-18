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
    this.exteriorRequest = new ExteriorRequestI('','','',0,0,0,'','',0,'','','',0,);
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

  createNewoutsidevehicle(ExteriorForm){
    if (this.editing) {
      const outsidevehicle: ExteriorRequestI = {

        unit: ExteriorForm.value.unit,
        responsible: ExteriorForm.value.responsible,
        date: ExteriorForm.value.date,
        day: ExteriorForm.value.day,
        departament: ExteriorForm.value.departament,
        municipality: ExteriorForm.value.municipality,
        village: ExteriorForm.value.village,
        trip: ExteriorForm.value.trip,
        hour: ExteriorForm.value.hour,
        returnn: ExteriorForm.value.returnn,
        Gas: ExteriorForm.value.Gas,
        Viatic: ExteriorForm.value.Viatic,
        Cell: ExteriorForm.value.Cell,
      }
      if (ExteriorForm.valid) {
        this._exteriorRoutesService.updateOneRequestExterior(outsidevehicle, this._exteriorRoutesService).subscribe(
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
        unit: ExteriorForm.value.unit,
        responsible: ExteriorForm.value.responsible,
        date: ExteriorForm.value.date,
        day: ExteriorForm.value.day,
        departament: ExteriorForm.value.departament,
        municipality: ExteriorForm.value.municipality,
        village: ExteriorForm.value.village,
        trip: ExteriorForm.value.trip,
        hour: ExteriorForm.value.hour,
        returnn: ExteriorForm.value.returnn,
        Gas: ExteriorForm.value.Gas,
        Viatic: ExteriorForm.value.Viatic,
        Cell: ExteriorForm.value.Cell,
    }
    console.log("Se registro el vehiculo correctamente");
    if (ExteriorForm.valid) {
      this._exteriorRoutesService.createNewRequestExterior(exteriorRequest).subscribe(
        response => {
          console.log("Se registro el vehiculo correctamente");
          this.exteriorRequest = new ExteriorRequestI('','','',0,0,0,'','',0,'','','',0,);
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
