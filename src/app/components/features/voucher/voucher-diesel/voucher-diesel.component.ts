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
  public comissions;
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
    this._vehicleService.getVehicles('diesel').subscribe(
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
    this._personService.getPilots().subscribe(
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
    if (this.comission === 'Sin Comisión') {
      this.comissions = voucherForm.value.comission_to;
      this.objective = voucherForm.value.objective;
    }

    const voucher: VoucherDieselI = {
      date: this.todayWithPipe,
      cost:voucherForm.value.cost,
      idVehicle: voucherForm.value.idVehicle,
      vin: '',
      comission_to: this.comissions,
      objective: this.objective,
      id_pilot: this.voucher.uuid,
      km_gallon: voucherForm.value.km_gallon,
      service_of: this.voucher.service_of,
      comission_date: this.todayWithPipe,//agregarle fecha
      km_to_travel:voucherForm.value.km_to_travel,
    }
    // if (!voucherForm.valid) {
    //   this._sweetAlertService.warning('Complete correctamente el formulario');
    //   return
    // }
    // this._voucherService.createNewVoucherDisel(voucher).subscribe(
    //   response => {
    //     this._sweetAlertService.createAndUpdate('Se registro el vale correctamente');
    //     this.voucher = new VoucherDieselI('', '', '', '','', '', '', '', '', '', '')
    //     this._router.navigate(['Vouchertable'])
    //   }, error => {
    //     this.data_response = error;
    //     this._errorService.error(this.data_response);
    //   }
    // )
    }

    getLocalRequest(){
      this._requestLocalService.getLocalRequest().subscribe(
        response =>{
          this.localRequest = response.data;
        }, error =>{
        }
      )
    }

    getExteriorRequest(){
      this._requestExteriorService.getExteriorRequest().subscribe(
        response =>{
          this.exteriorRequest = response.data;
        }, error =>{
        }
      )
    }

    getOneLocalRequest(id){
      this._requestLocalService.getOneLocalRequest(id).subscribe(
        response =>{
          this.oneLocalRequest = response.data.request[0];
          this.voucher.service_of = this.oneLocalRequest.applicantsName;
          this.date = this.oneLocalRequest.date;
          this.objective = this.oneLocalRequest.observations;
          this.voucher.uuid = this.oneLocalRequest.pilotName;
          this.getOnePerson(this.voucher.uuid)
          this.comissions = this.oneLocalRequest.section;
        }, error =>{
        }
      )
    }

    getOneExteriorRequest(id){
      this._requestExteriorService.getOneExteriorRequest(id).subscribe(
        response =>{
          this.oneExteriorRequest = response.data.request[0];
          this.voucher.service_of = this.oneExteriorRequest.commission_manager;
          this.date = this.oneExteriorRequest.date_request;
          this.objective = this.oneExteriorRequest.objective_request;
          this.voucher.uuid = this.oneExteriorRequest.pilot_name;
          this.getOnePerson(this.voucher.uuid)
          this.comissions = this.oneExteriorRequest.requesting_unit;
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
