import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VoucherDieselI} from 'src/app/models/voucher.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Router } from '@angular/router';
import { LocalRequestService } from 'src/app/services/localRequest.service';
import { ExteriorRequestService } from 'src/app/services/exteriorRequest.service';



@Component({
  selector: 'app-voucher-diesel',
  templateUrl: './voucher-diesel.component.html',
  styleUrls: ['./voucher-diesel.component.css']
})
export class VoucherDieselComponent implements OnInit {
  public person;
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
  public vehicleNum;
  public localRequest;
  public exteriorRequest;
  public oneLocalRequest;
  public oneExteriorRequest;
  public comission;
  public applicantsName;
  public date;
  public objective;
  public pilotName;
  public DPI;

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;

  types: string[] = ['Local', 'Exterior', 'Sin Comisión'];

  constructor(
    private _vehicleService: VehicleService,
    private _personService: PersonService,
    private _voucherService:VoucherService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router: Router,
    private _requestLocalService:LocalRequestService,
    private _requestExteriorService:ExteriorRequestService,
    ) {
      this.voucher=new VoucherDieselI('', '', '', '','', '', '', '', '', '', '')
     }

  ngOnInit(): void {
    this.getPerson();
    this.getVehicles();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy/MM/dd')
    this.getLocalRequest();
    this.getExteriorRequest();
  }

  getVehicles(){
    this._vehicleService.getVehicles().subscribe(
      response =>{
        this.vehicles = response.data;
      }, error =>{

      }
    )
  }
  getOneVehicle(id) {
    this._vehicleService.getOneVehicleForVoucher(id).subscribe(
      response => {
        this.Onevehicle = response.data[0];
        console.log(this.Onevehicle)
        this.brand=this.Onevehicle.brand
        this.color=this.Onevehicle.color
        this.model=this.Onevehicle.model
        this.type_name=this.Onevehicle.type_name
        this.vehicleNum=this.Onevehicle.idVehicle
      }, error => {
      }
    )
  }

  getPerson(){
    this._personService.getPerson().subscribe(
      response =>{
       this.person = response.data;
      }, error =>{
      }
    )
  }

  getOnePerson(id){
    this._personService.getOnePerson(id).subscribe(
      response =>{
       this.Oneperson = response.data[0];
      this.dpi=this.Oneperson.dpi
      }, error =>{
      }
    )
  }

  createVoucher(voucherForm) {
    let comissions;
    if (this.comission === 'Local') {
      comissions = voucherForm.value.local_comission;
    } else if (this.comission === 'Exterior') {
      comissions = voucherForm.value.exterior_comission;
    } else if (this.comission === 'Sin Comisión') {
      comissions = voucherForm.value.comission_to;
    }

    const voucher: VoucherDieselI = {
      date: this.todayWithPipe,
      cost:voucherForm.value.cost,
      idVehicle: voucherForm.value.idVehicle,
      vin: '',
      comission_to: comissions,
      objective: this.objective,
      id_pilot: voucherForm.value.uuid,
      km_gallon: voucherForm.value.km_gallon,
      service_of:voucherForm.value.service_of,
      comission_date: this.todayWithPipe,//agregarle fecha
      km_to_travel:voucherForm.value.km_to_travel,
    }
    console.log(voucher)
    if (!voucherForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
    this._voucherService.createNewVoucherDisel(voucher).subscribe(
      response => {
        this._sweetAlertService.createAndUpdate('Se registro el vale correctamente');
        this.voucher = new VoucherDieselI('', '', '', '','', '', '', '', '', '', '')
        this._router.navigate(['Vouchertable'])
      }, error => {
        this.data_response = error;
        this._errorService.error(this.data_response);
      }
    )
    }

    getLocalRequest(){
      this._requestLocalService.getLocalRequest().subscribe(
        response =>{
          this.localRequest = response.data;
          console.log(this.localRequest)
        }, error =>{
        }
      )
    }

    getExteriorRequest(){
      this._requestExteriorService.getExteriorRequest().subscribe(
        response =>{
          this.exteriorRequest = response.data;
          console.log(this.exteriorRequest)
        }, error =>{
        }
      )
    }

    getOneLocalRequest(id){
      this._requestLocalService.getOneLocalRequestComplete(id).subscribe(
        response =>{
          this.oneLocalRequest = response.data.request[0];
          this.voucher.service_of = this.oneLocalRequest.applicantsName;
          this.date = this.oneLocalRequest.date;
          this.objective = this.oneLocalRequest.observations;
          this.pilotName = this.oneLocalRequest.fullname;
          this.DPI = this.oneLocalRequest.plate;
          console.log(this.oneLocalRequest)
        }, error =>{
        }
      )
    }

    getOneExteriorRequest(id){
      this._requestExteriorService.getOneExteriorRequestComplete(id).subscribe(
        response =>{
          this.oneExteriorRequest = response.data.request[0];
          console.log(this.oneExteriorRequest)
          this.voucher.service_of = this.oneLocalRequest.commission_manager;
          this.date = this.oneLocalRequest.date_request;
          this.objective = this.oneLocalRequest.objective_request;
          this.pilotName = this.oneLocalRequest.fullname;
          this.DPI = this.oneLocalRequest.plate;
        }, error =>{
        }
      )
    }

    formIsValid(form) {
      if (form.valid) {
        return true;
      }
      return false;
    }
}
