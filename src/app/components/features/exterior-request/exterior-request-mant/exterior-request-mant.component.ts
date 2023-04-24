import { Component, OnInit } from '@angular/core';
import { ExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { InfoService } from 'src/app/services/info.service';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { DetailExteriorRequestI } from 'src/app/models/exteriorRequest.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exterior-request-mant',
  templateUrl: './exterior-request-mant.component.html',
  styleUrls: ['./exterior-request-mant.component.css']
})
export class ExteriorRequestMantComponent implements OnInit {

  public id_entrada;
  public exteriorRequest;
  public departments;
  public Onemunicipality;
  public person;
  public vehicles;
  public data_response;
  public editing: boolean = false;
  public status: boolean = false;
  public deny: boolean = false;
  detailrequest: any = {};
  details: any[] = [];

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;

  constructor(private _infoService: InfoService,
    private _exteriorRoutesService: ExteriorRequestService,
    private _personService: PersonService,
    private _vehicleService: VehicleService,
    private router: ActivatedRoute,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router: Router) {
    this.exteriorRequest = new ExteriorRequestI('', '', '', '', '', '', '', 0, 0, '', '', '', '', []);
  }

  ngOnInit(): void {
    this.id_entrada = this.router.snapshot.params['id'];
    this.loadExteriorRequest()
    this.getDepartments();
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

  getPilotsActives() {
    this._personService.getPilotsActives().subscribe(
      response => {
        this.person = response.data;
      }, error => {
        this._sweetAlertService.warning('No se pudieron cargar las personas correctamente');
      }
    )
  }

  getVehiclesActives() {
    this._vehicleService.getVehiclesActives().subscribe(
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
      this._exteriorRoutesService.getOneExteriorRequest(this.id_entrada).subscribe(
        response => {
          this.exteriorRequest = response.data.request[0]
          this.details = response.data.detailRequest
          this.getPilotsActives();
          this.getVehiclesActives();
          if (this.exteriorRequest.status_request == 7) {
            this.status = true;
          } else if (this.exteriorRequest.status_request == 9) {
            this.deny = true;
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
      this._exteriorRoutesService.createNewExteriorRequest(exteriorRequest).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro la solicitud de vehiculo correctamente');
          this.exteriorRequest = new ExteriorRequestI('', '', '', '', '', '', '', 0, 0, '', '', '', '', []);
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
    this._router.navigate(['/exteriorRequest-index'])
  }

  createDetailRequest(detailExteriorForm) {
    if (detailExteriorForm.valid) {
      const datos: DetailExteriorRequestI = {
        dateOf: detailExteriorForm.value.dateOf,
        dateTo: detailExteriorForm.value.dateTo,
        hour: detailExteriorForm.value.hour,
        department: detailExteriorForm.value.department,
        number_people: detailExteriorForm.value.number_people,
        municipality: detailExteriorForm.value.municipality,
        village: detailExteriorForm.value.village,
      }
        this.details.push(datos);
        this.detailrequest = {};

    } else {
      this._sweetAlertService.warning('Complete correctamente la información del destino');
    }
  }

  deleteDetailRequest() {
    this.details.pop();

  }
  acceptRequest(acceptedForm) {
    const accepted: ExteriorRequestI = {
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
      this._exteriorRoutesService.updateOneExteriorRequest(accepted, this.id_entrada).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se acepto correctamente la solicitud');
          this._router.navigate(['viajes'])
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

  async denyRequest() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Indique el motivo del rechazo:',
      inputPlaceholder: 'Escribe acá el motivo...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (!text) {
      this._sweetAlertService.warning('Debe ingresar un motivo');
      return
    }
    const deny: ExteriorRequestI = {
      requesting_unit: '',
      commission_manager: '',
      date_request: '',
      objective_request: '',
      duration_days: '',
      phoneNumber: '',
      observations: '',
      provide_fuel: 0,
      provide_travel_expenses: 0,
      plate_vehicle: '',
      pilot_name: '',
      status_request: "9",
      reason_rejected: text,
      detail: []
    }
    this._exteriorRoutesService.updateOneExteriorRequest(deny, this.id_entrada).subscribe(
      response => {
        this._sweetAlertService.createAndUpdate('Se denego correctamente la solicitud');
        this._router.navigate(['localRequest-index'])
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }, error => {
        console.log(error)
        this.data_response = error;
        this._errorService.error(this.data_response);
      }
    );
  }
}
