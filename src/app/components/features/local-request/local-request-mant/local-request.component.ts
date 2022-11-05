import { Component, OnInit } from '@angular/core';
import { LocalRequestI } from 'src/app/models/localRequest.interface';
import { DetailLocalRequestI } from 'src/app/models/detailLocalRequest.interface';
import { RequestlocalService } from 'src/app/services/requestLocal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ResponseI } from 'src/app/models/response.interface';
import { ErrorsService } from 'src/app/services/errors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-local-request',
  templateUrl: './local-request.component.html',
  styleUrls: ['./local-request.component.css']
})
export class LocalRequestMantComponent implements OnInit {

  public localRequest;
  public editing: boolean = false;
  public status: boolean = false;
  public deny: boolean = false;
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
    private _errorService: ErrorsService,
    private _router:Router) {
    this.localRequest = new LocalRequestI("", "", "", "", "", "", "", 0, "", "", [])
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    this.loadLocalRequest();
    this.getPilotsActives();
    this.getVehiclesActives();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy/MM/dd')
  }

  getPilotsActives(){
    this._personService.getPilotsActives().subscribe(
      response =>{
       this.person = response.data;
      }, error =>{

      }
    )
  }

  getVehiclesActives(){
    this._vehicleService.getVehiclesActives().subscribe(
      response =>{
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
          this.localRequest = response.data.request[0]
          this.details = response.data.detailRequest
          if (this.localRequest.status == 7) {
            this.status = true;
          }else if(this.localRequest.status == 9){
            this.deny = true;
          }
        }, err => {

        }
      )
    } else {
      this.editing = false
    }

  }

  createLocalRequest(localRequestForm) {
    const transportation_local: LocalRequestI = {
      pilotName: '',
      plate: '',
      place: localRequestForm.value.place,
      date: this.todayWithPipe,
      section: localRequestForm.value.section,
      applicantsName: localRequestForm.value.applicantsName,
      position: localRequestForm.value.position,
      phoneNumber: localRequestForm.value.phoneNumber,
      observations: localRequestForm.value.observations,
      status: '',
      detail: this.details
    }

    if (!localRequestForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
      this._localRequestService.createOneRequestLocal(transportation_local).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro la solicitud correctamente');
          this.localRequest = new LocalRequestI("", "", "", "", "", "", "", 0, "", "", [])
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      )
      this._router.navigate(['/localRequest-index'])
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

  acceptRequest(acceptedForm){
    const accepted:LocalRequestI = {
      pilotName: acceptedForm.value.pilotName,
      plate: acceptedForm.value.plate,
      place: '',
      date: '',
      section: '',
      applicantsName: '',
      position: '',
      phoneNumber: 0,
      status: "7",
      observations: '',
      detail: []
    }
    if (acceptedForm.valid) {
      this._localRequestService.updateOneRequestLocal(accepted, this.id_entrada).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se acepto correctamente la solicitud');
          this._router.navigate(['viajes'])
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    } else {
      this._sweetAlertService.warning('Complete correctamente el formulario');
    }
  }

  async denyRequest(){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta acción no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, denegar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const deny:LocalRequestI = {
          pilotName: '',
          plate: '',
          place: '',
          date: '',
          section: '',
          applicantsName: '',
          position: '',
          phoneNumber: 0,
          status: "9",
          observations: '',
          detail: []
        }
        this._localRequestService.updateOneRequestLocal(deny, this.id_entrada).subscribe(
          response => {
            this._sweetAlertService.createAndUpdate('Se denego correctamente la solicitud');
            this._router.navigate(['localRequest-index'])
          }, error => {
            this.data_response = error;
            this._errorService.error(this.data_response);
          }
        );
      }
    })


  }
}
