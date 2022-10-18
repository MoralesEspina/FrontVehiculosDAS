import { Component, OnInit } from '@angular/core';
import { outsidevehiclemanT } from 'src/app/models/outsidevehicleman.interface';
import { inforoutsidevehicle } from 'src/app/services/inforoutsidevehicle.service';
import { outsidevehicleService } from 'src/app/services/outsidevehicle.service';



@Component({
  selector: 'app-outsidevehicle-mant',
  templateUrl: './outsidevehicle-mant.component.html',
  styleUrls: ['./outsidevehicle-mant.component.css']
})
export class OutsidevehicleMantComponent implements OnInit {

public outsidevehiclemant;
public types;
public status;
public gas;
public editing: boolean = false;

  constructor(private _inforoutsidevehicle:inforoutsidevehicle,
              private _outsidevehicleService:outsidevehicleService) {

    this.outsidevehiclemant = new outsidevehiclemanT('','','',0,0,0,'','',0,'','','',0,); 
  }
   

  ngOnInit(): void {
    this.getTypes();
    this.getStatus();
  }

  getTypes() {
    this._inforoutsidevehicle.getTypes().subscribe(
      response => {
        this.types = response.data;
      }, error => {
      }
    )
  }

  getStatus() {
    this._inforoutsidevehicle.getTypes().subscribe(
      response => {
        this.types = response.data;
      }, error => {
      }
    )
  }

  createNewoutsidevehicle(ExteriorForm){
    if (this.editing) {
      const outsidevehicle: outsidevehiclemanT = {
       
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
        this._outsidevehicleService.updateOneoutsidevehiclemant(outsidevehicle, this._outsidevehicleService).subscribe(
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
      const outsidevehiclemant: outsidevehiclemanT = {
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
      this._outsidevehicleService.createNewoutsidevehiclemant(outsidevehiclemant).subscribe(
        response => {
          console.log("Se registro el vehiculo correctamente");
          this.outsidevehiclemant = new outsidevehiclemanT('','','',0,0,0,'','',0,'','','',0,);
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
