import { Component, OnInit } from '@angular/core';
import { ExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { InfoService } from 'src/app/services/info.service';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { DetailExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ResponseI } from 'src/app/models/response.interface';
import { ErrorsService } from 'src/app/services/errors.service';
import * as moment from 'moment'

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
  public status: boolean = false;
  detailrequest: any = {};
  details: any[] = [];
  public data_response;

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;

  constructor(private _infoService: InfoService,
    private _exteriorRoutesService: ExteriorRequestService,
    private _personService: PersonService,
    private _vehicleService: VehicleService,
    private router: ActivatedRoute,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService) {
    this.exteriorRequest = new ExteriorRequestI('', '', '', '', '', '', '', 0, 0, '', '', '','',[]);
  }

  ngOnInit(): void {
    this.getDepartments();
    this.id_entrada = this.router.snapshot.params['id'];
    this.loadExteriorRequest()
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy/MM/dd')
  }

  getDepartments() {
    this._infoService.getDepartments().subscribe(
      response => {
        this.departments = response.data;
      }, error => {
      }
    )
  }

  getOneDepartment(id) {
    this._infoService.getOneDepartment(id).subscribe(
      response => {
        this.Onemunicipality = response.data.mun;
      }, error => {
      }
    )
  }

  getPerson() {
    this._personService.getPerson().subscribe(
      response => {
        this.person = response.data;
      }, error => {
        this._sweetAlertService.warning('No se pudieron cargar las personas correctamente');
      }
    )
  }

  getVehicles() {
    this._vehicleService.getVehicles().subscribe(
      response => {
        this.vehicles = response.data;
      }, error => {
        this._sweetAlertService.warning('No se pudieron cargar los vehiculos correctamente');
      }
    )
  }

  loadExteriorRequest() {
    if (this.id_entrada) {
      this.editing = true
      this._exteriorRoutesService.getOneRequestExterior(this.id_entrada).subscribe(
        response => {
          this.exteriorRequest = response.data.request[0]
          this.details = response.data.detailRequest
          this.getPerson();
          this.getVehicles();
          if (this.exteriorRequest.status_request == 7) {
            this.status = true;
          }
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      )
    } else {
      this.editing = false
    }
  }

  createNewExteriorRequest(ExteriorForm) {
    const exteriorRequest: ExteriorRequestI = {
      requesting_unit: ExteriorForm.value.requesting_unit,
      commission_manager: ExteriorForm.value.commission_manager,
      date_request: this.todayWithPipe,
      objective_request: ExteriorForm.value.objective_request,
      duration_days: ExteriorForm.value.duration_days,
      phoneNumber: ExteriorForm.value.phoneNumber,
      observations: ExteriorForm.value.observations,
      provide_fuel: 0,
      provide_travel_expenses: 0,
      plate_vehicle: '',
      pilot_name: '',
      reason_rejected: '',
      status_request: '',
      detail: this.details
    }
    if (ExteriorForm.valid) {
      this._exteriorRoutesService.createNewRequestExterior(exteriorRequest).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro la solicitud de vehiculo correctamente');
          this.exteriorRequest = new ExteriorRequestI('', '', '', '', '', '', '', 0, 0, '', '', '','', []);
          this.details = [];
        }, error => {
          console.log(error)
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    } else {
      this._sweetAlertService.warning('Complete correctamente el formulario');
    }
  }

  createDetailRequest(detailExterioForm) {
    const datos: DetailExteriorRequestI = {
      dateOf: detailExterioForm.value.dateOf,
      dateTo: detailExterioForm.value.dateTo,
      hour: detailExterioForm.value.hour,
      department: detailExterioForm.value.department,
      number_people: detailExterioForm.value.number_people,
      municipality: detailExterioForm.value.municipality,
      village: detailExterioForm.value.village,
    }
    this.details.push(this.detailrequest);
    this.detailrequest = {};
  }

  acceptRequest(acceptedForm){
    const accepted:ExteriorRequestI = {
      requesting_unit: '',
      commission_manager: '',
      date_request: '',
      objective_request: '',
      duration_days: '',
      phoneNumber: '',
      observations: '',
      provide_fuel: acceptedForm.value.provide_fuel,
      provide_travel_expenses: acceptedForm.value.provide_travel_expenses,
      plate_vehicle: acceptedForm.value.plate_vehicle,
      pilot_name: acceptedForm.value.pilot_name,
      status_request: "7",
      reason_rejected: '',
      detail: []
    }
    if (acceptedForm.valid) {
      this._exteriorRoutesService.updateOneRequestExterior(accepted, this.id_entrada).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se acepto correctamente la solicitud');
        }, error => {
          console.log(error)
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    } else {
      this._sweetAlertService.warning('Complete correctamente el formulario');
    }
  }
}
