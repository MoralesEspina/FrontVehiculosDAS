import { Component, OnInit } from '@angular/core';
import { ExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { InfoService } from 'src/app/services/info.service';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { DetailExteriorRequestI } from 'src/app/models/detailExteriorRequest.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exterior-request-mant',
  templateUrl: './exterior-request-mant.component.html',
  styleUrls: ['./exterior-request-mant.component.css']
})
export class ExteriorRequestMantComponent implements OnInit {

public exteriorRequest;
public departments;
public Onemunicipality;
public person;
public vehicles;
public editing: boolean = false;
public id_entrada;
detailrequest: any = {};
details: any[] = [];
provide_fue = [
  { id: 0, name: 'Si' },
  { id: 1, name: 'No' },
];

today: Date = new Date();
pipe = new DatePipe('en-US');
todayWithPipe;



  constructor(private _infoService:InfoService,
              private _exteriorRoutesService:ExteriorRequestService,
              private _personService: PersonService,
              private _vehicleService: VehicleService,
              private router: ActivatedRoute) {
    this.exteriorRequest = new ExteriorRequestI('','','','','','','',0,0,'','','',[]);
  }

  ngOnInit(): void {

   this.getDepartments();
   this.getPerson();
   this.getVehicles();
   this.id_entrada = this.router.snapshot.params['id'];
   this.loadLocalRequest()
   this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  }

  getDepartments() {
    this._infoService.getDepartments().subscribe(
      response => {
        this.departments = response.data;
        console.log(this.departments)
      }, error => {
      }
    )
  }

  getOneDepartment(id) {
    this._infoService.getOneDepartment(id).subscribe(
      response => {
        this.Onemunicipality = response.data.mun;
        console.log(this.Onemunicipality)
      }, error => {
      }
    )
  }

  getPerson(){
    this._personService.getPerson().subscribe(
      response =>{
       this.person = response.data;
        console.log(this.person)
      }, error =>{

      }
    )
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

  loadLocalRequest() {
    if (this.id_entrada) {
      this.editing = true
      this._exteriorRoutesService.getOneRequestExterior(this.id_entrada).subscribe(
        response => {
          console.log(response)
          this.exteriorRequest= response.data.request[0]
          this.details = response.data.detailRequest
        }, err => {

        }
      )
    } else {
      this.editing = false
    }

  }


  createNewExteriorRequest(ExteriorForm){
    const exteriorRequest: ExteriorRequestI = {
      requesting_unit: ExteriorForm.value.requesting_unit,
      commission_manager: ExteriorForm.value.commission_manager,
      date_request:this.todayWithPipe,
      objective_request: ExteriorForm.value.objective_request,
      duration_days: ExteriorForm.value.duration_days,
      phoneNumber: ExteriorForm.value.phoneNumber,
      observations: ExteriorForm.value.observations,
      provide_fuel: ExteriorForm.value.provide_fuel,
      provide_travel_expenses: ExteriorForm.value.provide_travel_expenses,
      plate_vehicle: ExteriorForm.value.plate_vehicle,
      pilot_name: ExteriorForm.value.pilot_name,
      reason_rejected: ExteriorForm.value.reason_rejected,
      detail: this.details
  }
  if (ExteriorForm.valid) {
    this._exteriorRoutesService.createNewRequestExterior(exteriorRequest).subscribe(
      response => {
        console.log("Se registro la solicitud del vehiculo correctamente");
        this.exteriorRequest = new ExteriorRequestI('','','','','','','',0,0,'','','',[]);
      }, error => {
        console.log(error.error.data)
      }
    );
  } else {
      console.log("Hubo un error al registro la solicitud del vehiculo");
  }
}

createDetailRequest(detailExterioForm) {
  const datos: DetailExteriorRequestI = {
    dateOf: detailExterioForm.value.dateOf,
    dateTo: detailExterioForm.value.dateTo,
    hour: detailExterioForm.value.hour,
    department: detailExterioForm.value.department,
    number_people:detailExterioForm.value.number_people,
    municipality: detailExterioForm.value.municipality,
    village:detailExterioForm.value.village,
  }

  console.log(datos)
  this.details.push(this.detailrequest);
  this.detailrequest = {};

}



}
