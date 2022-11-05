import { Component, OnInit } from '@angular/core';
import { LocalRequestI } from 'src/app/models/localRequest.interface';
import { DetailLocalRequestI } from 'src/app/models/detailLocalRequest.interface';
import { RequestlocalService } from 'src/app/services/requestLocal.service';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ResponseI } from 'src/app/models/response.interface';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-local-request',
  templateUrl: './local-request.component.html',
  styleUrls: ['./local-request.component.css']
})
export class LocalRequestMantComponent implements OnInit {

  public transportation;
  public editing: boolean = false;
  public id_entrada;
  public person;
  public vehicles;
  public data_response;
  details: any[] = [];
  detailrequest: any = {};

  placess = [
    { id: 7, name: 'Jalapa' },
    { id: 1, name: 'Monjas' },
    { id: 2, name: 'San Pedro Pinula' },
    { id: 3, name: 'Mataquescuintla' },
    { id: 4, name: 'San Luis Jilotepeque' },
    { id: 5, name: 'San Manuel Chaparrón' },
    { id: 6, name: 'San Carlos Alzatate' },
  ];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;

  constructor(private _localRequestService: RequestlocalService, private router: ActivatedRoute,
    private _personService: PersonService,
    private _vehicleService: VehicleService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService) {
    this.transportation = new LocalRequestI("", "", "", "", "", "", "", 0, "", [])
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    this.loadLocalRequest();
    this.getPerson();
    this.getVehicles();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
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
      this._localRequestService.getOneRequestLocal(this.id_entrada).subscribe(
        response => {
          console.log(response)
          this.transportation = response.data.request[0]
          this.details = response.data.detailRequest
        }, err => {

        }
      )
    } else {
      this.editing = false
    }

  }

  createLocalRequest(localRequestForm) {
    const transportation_local: LocalRequestI = {
      pilotName: localRequestForm.value.pilotName,
      plate: localRequestForm.value.plate,
      place: localRequestForm.value.place,
      date: this.todayWithPipe,
      section: localRequestForm.value.section,
      applicantsName: localRequestForm.value.applicantsName,
      position: localRequestForm.value.position,
      phoneNumber: localRequestForm.value.phoneNumber,
      observations: localRequestForm.value.observations,
      detail: this.details
    }

    if (!localRequestForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
      this._localRequestService.createOneRequestLocal(transportation_local).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro la solicitud correctamente');
          this.transportation = new LocalRequestI("", "", "", "", "", "", "", 0, "", [])
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      )
    }


  createDetailLocalRequest(detailLocalForm) {

    const person: DetailLocalRequestI = {
      dateOf: detailLocalForm.value.dateOf,
      dateTo: detailLocalForm.value.dateTo,
      schedule: detailLocalForm.value.schedule,
      destiny: detailLocalForm.value.destiny,
      peopleNumber: detailLocalForm.value.peopleNumber,
      comission: detailLocalForm.value.comission
    }

    console.log(person)
    // se inserta el dato en el arreglo
    this.details.push(this.detailrequest);
    // se crea un nuevo objeto para almacenar nuevos datos
    this.detailrequest = {};

  }

}
