import { Component, OnInit } from '@angular/core';
import { LocalRequestI } from 'src/app/models/localRequest.interface';
import { DetailLocalRequestI } from 'src/app/models/detailLocalRequest.interface';
import { LocalRequestService } from 'src/app/services/localRequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';
import Swal from 'sweetalert2';
import { DateI } from 'src/app/models/tripsdate.interface';

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
  public onHold: boolean = false;
  public id_entrada;
  public person;
  public vehicles;
  public data_response;
  details: any[] = [];
  detailrequest: any = {};
  date: any[] = [];
  public initialdate;
  public finaldate;

  places = [
    { id: 1, name: 'Jalapa' },
    { id: 2, name: 'Monjas' },
    { id: 3, name: 'San Pedro Pinula' },
    { id: 4, name: 'Mataquescuintla' },
    { id: 5, name: 'San Luis Jilotepeque' },
    { id: 6, name: 'San Manuel Chaparrón' },
    { id: 7, name: 'San Carlos Alzatate' },
  ];

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;
  
  constructor(private _localRequestService: LocalRequestService,
    private router: ActivatedRoute,
    private _personService: PersonService,
    private _vehicleService: VehicleService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router:Router) {
    this.localRequest = new LocalRequestI("", "", "", "", "", "", "", "", "", "", [])
    this.detailrequest.destiny = ''
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    this.loadLocalRequest();
    this.getPilotsActives();
    this.getVehiclesActives();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy/MM/dd')
  }

  getPilotsActives(){


    const date: DateI = {
      initialDateOf: this.initialdate,
      finalDateTo: this.finaldate,
    }
console.log(date)
    this._personService.getPilotsActives(date).subscribe(
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
      this._localRequestService.getOneLocalRequest(this.id_entrada,'').subscribe(
        response => {
          this.localRequest = response.data.request[0]
          this.details = response.data.detailRequest
          this.initialdate = response.data.detailRequest.dateOf;
          this.finaldate = response.data.detailRequest.dateTo;
          console.log(response)
          if (this.localRequest.status == 7) {
            this.status = true;
            this.onHold = false;
          }else if(this.localRequest.status == 9){
            this.deny = true;
            this.onHold = false;
          }else if(this.localRequest.status == 6){
            this.onHold = true;
            this.localRequest.pilotName = ''
            this.localRequest.plate = ''
          }
        }, err => {

        }
      )
    } else {
      this.editing = false
    }

  }

  createLocalRequest(localRequestForm) {
    const request_local: LocalRequestI = {
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
      this._localRequestService.createOneLocalRequest(request_local).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro la solicitud correctamente');
          this.localRequest = new LocalRequestI("", "", "", "", "", "", "", "", "", "", [])
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      )
      this._router.navigate(['/localRequest-index'])
    }


  createDetailLocalRequest(detailRequestForm) {

    if (detailRequestForm.valid) {
      const detailRequest: DetailLocalRequestI = {
        dateOf: detailRequestForm.value.dateOf,
        dateTo: detailRequestForm.value.dateTo,
        schedule: detailRequestForm.value.schedule,
        destiny: detailRequestForm.value.destiny,
        peopleNumber: detailRequestForm.value.peopleNumber,
        comission: detailRequestForm.value.comission
      }

      this.details.push(detailRequest);
      this.detailrequest = {};
      this.detailrequest.destiny = '';
    } else{
      this._sweetAlertService.warning('Complete correctamente la información del destino');
    }
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
      phoneNumber: '',
      status: "7",
      observations: '',
      detail: []
    }
    if (acceptedForm.valid) {
      this._localRequestService.updateOneLocalRequest(accepted, this.id_entrada).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se acepto correctamente la solicitud');
          this._router.navigate(['Trips'])
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
          phoneNumber: '',
          status: "9",
          observations: '',
          detail: []
        }
        this._localRequestService.updateOneLocalRequest(deny, this.id_entrada).subscribe(
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

  deleteDetailRequest() {
    this.details.pop();
  }

  existDetails() {
    if (this.details.length == 0) {
      return true;
    }
    return false;
  }
  formIsValid(form) {
    if (this.details.length >= 1 && form.valid) {
      return true;
    }
    return false;
  }

  detailIsValid(form) {
    if (form.valid) {
      return true;
    }
    return false;
  }

  maxPlaces() {
    if (this.details.length == 5) {
      return true;
    }
    return false;
  }
}
