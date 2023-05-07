import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VoucherDieselI, VoucherGasolineI } from 'src/app/models/voucher.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Router } from '@angular/router';
import { LocalRequestService } from 'src/app/services/localRequest.service';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';
import { TripsService } from 'src/app/services/trips.service';


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  public pilots;
  public Oneperson;
  public dpi;
  public voucher;
  public editing: boolean = false;
  public id_entrada;
  public vehicles;
  public Onevehicle;
  public data_response;
  public color;
  public model;
  public brand;
  public type_name;
  public idVehicle;
  public oneLocalRequest;
  public oneExteriorRequest;
  public comission;
  public comissions;
  public applicantsName;
  public date;
  public objective;
  public pilotName;
  public DPI;
  public localTrips;
  public exteriorTrips;
  public idTrips;


  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;


  types: string[] = ['Local', 'Exterior', 'Sin Viaje'];


  constructor(
    private _vehicleService: VehicleService,
    private _personService: PersonService,
    private _voucherService: VoucherService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router: Router,
    private _requestLocalService: LocalRequestService,
    private _requestExteriorService: ExteriorRequestService,
    private _tripsService: TripsService,
  ) {

    this.voucher = new VoucherDieselI('', '', '', '', '', '', '', '')

  }

  ngOnInit(): void {
    this.getPilots();
    this.getVehicles();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy/MM/dd')
    this.getLocalTrips();
    this.getExteriorTrips();
  }

  getVehicles() {
    this._vehicleService.getVehicles('regular').subscribe(
      response => {
        this.vehicles = response.data;
      }, error => {

      }
    )
  }

  getOneVehicle(id) {
    this._vehicleService.getOneVehicleForVoucher(id).subscribe(
      response => {
        this.Onevehicle = response.data[0];
        this.brand = this.Onevehicle.brand
        this.color = this.Onevehicle.color
        this.model = this.Onevehicle.model
        this.type_name = this.Onevehicle.type_name
        this.idVehicle = this.Onevehicle.idVehicle
      }, error => {
      }
    )
  }

  getPilots() {
    this._personService.getPilots().subscribe(
      response => {
        this.pilots = response.data;
      }, error => {
      }
    )
  }

  getOnePerson(id) {
    this._personService.getOnePerson(id).subscribe(
      response => {
        this.Oneperson = response.data[0];
        this.dpi = this.Oneperson.dpi
      }, error => {
      }
    )
  }

  createVoucher(voucherForm) {
    if (this.comission === 'Sin viaje') {
      this.comissions = voucherForm.value.comission_to;
      this.objective = voucherForm.value.objective;
      this.idTrips = '';
    }
    const voucher: VoucherGasolineI = {
      date: this.todayWithPipe,
      cost: voucherForm.value.cost,
      idVehicle: voucherForm.value.vin,
      comission_to: this.comissions,
      objective: this.objective,
      id_pilot: this.voucher.uuid,
      km_to_travel: voucherForm.value.km_to_travel,
      idtrips: this.voucher.idtrips,
    }
    if (!voucherForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
    this._voucherService.createNewVoucherRegular(voucher).subscribe(
      response => {
        this._sweetAlertService.createAndUpdate('Se registro el vale correctamente');
        this.voucher = new VoucherGasolineI("", 0, "", "", "", "", "", '')
        this._router.navigate(['Vouchertable'])
      }, error => {
        this.data_response = error;
        this._errorService.error(this.data_response);
      }
    )
  }


  getOneLocalRequest(id) {
    this._requestLocalService.getOneLocalRequest(id, '').subscribe(
      response => {
        this.oneLocalRequest = response.data.request[0];
        this.voucher.service_of = this.oneLocalRequest.applicantsName;
        this.date = this.oneLocalRequest.date;
        this.objective = this.oneLocalRequest.observations;
        this.voucher.uuid = this.oneLocalRequest.pilotName;
        this.getOnePerson(this.voucher.uuid)
        this.comissions = this.oneLocalRequest.destinations;
        this.idTrips = this.oneLocalRequest.idtrips;
      }, error => {
      }
    )
  }

  getOneExteriorRequest(id) {
    this._requestExteriorService.getOneExteriorRequest(id, '').subscribe(
      response => {
        this.oneExteriorRequest = response.data.request[0];
        this.voucher.service_of = this.oneExteriorRequest.commission_manager;
        this.date = this.oneExteriorRequest.date_request;
        this.objective = this.oneExteriorRequest.objective_request;
        this.voucher.uuid = this.oneExteriorRequest.pilot_name;
        this.getOnePerson(this.voucher.uuid)
        this.comissions = this.oneExteriorRequest.destinations;
        this.idTrips = this.oneExteriorRequest.idtrips;
      }, error => {
      }
    )
    
  }

  clear() {
    this.voucher.service_of = '';
    this.date = '';
    this.objective = '';
    this.voucher.uuid = '';
    this.comissions = '';
    this.idTrips = '';
    this.dpi = '';
    this.voucher.local_comission = '';
    this.voucher.exterior_comission = '';

  }
  formIsValid(form) {
    if (form.valid) {
      return true;
    }
    return false;
  }

  getLocalTrips() {
    this._tripsService.getTrips('onHold', 'local').subscribe(
      response => {
        this.localTrips = response.data;
        console.log(this.localTrips)
      }, error => {
      }
    )
  }

  getExteriorTrips() {
    this._tripsService.getTrips('onHold', 'exterior').subscribe(
      response => {
        this.exteriorTrips = response.data;
        console.log(this.exteriorTrips)
      }, error => {
      }
    )
  }
}
