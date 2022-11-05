import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VoucherDieselI, VoucherGasolineI } from 'src/app/models/voucher.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Router } from '@angular/router';


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

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe;

  constructor(
    private _vehicleService: VehicleService,
    private _personService: PersonService,
    private _voucherService:VoucherService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router: Router
    ) {

      this.voucher=new VoucherDieselI('','','','','','','','','','')

     }

  ngOnInit(): void {
    this.getPilots();
    this.getVehicles();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy/MM/dd')
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
        this.brand=this.Onevehicle.brand
        this.color=this.Onevehicle.color
        this.model=this.Onevehicle.model
        this.type_name=this.Onevehicle.type_name
      }, error => {
      }
    )
  }

  getPilots(){
    this._personService.getPilots().subscribe(
      response =>{
       this.pilots = response.data;
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
    const voucher: VoucherGasolineI = {
      date: this.todayWithPipe,
      cost:voucherForm.value.cost,
      id_vehicle: voucherForm.value.vin,
      comission_to: voucherForm.value.comission_to,
      objective: voucherForm.value.objective,
      id_pilot: voucherForm.value.uuid,
    }

    if (!voucherForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
      this._voucherService.createNewVoucherRegular(voucher).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro el vale correctamente');
          this.voucher = new VoucherGasolineI("",0,"","","","")
          this._router.navigate(['Vouchertable'])
        }, error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      )
    }
}
