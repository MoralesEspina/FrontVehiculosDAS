import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VoucherDieselI, VoucherGasolineI } from 'src/app/models/voucher.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VoucherService } from 'src/app/services/voucher.service';


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  public person;
  public Oneperson;
  public dpi;
  public voucher;
  public editing: boolean = false;
  public id_entrada;
  public vehicles;
  public Onevehicle;

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
    private _voucherService:VoucherService
    ) {

      this.voucher=new VoucherDieselI('','','','','','','','','','','','','','','','','')

     }

  ngOnInit(): void {
    this.getPerson();
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
    const voucher: VoucherGasolineI = {
      date: this.todayWithPipe,
      cost:voucherForm.value.cost,
      id_vehicle: voucherForm.value.vin,
      comission_to: voucherForm.value.comission_to,
      objective: voucherForm.value.objective,
      id_pilot: voucherForm.value.pilot,
    }
    if (voucherForm.valid) {
      this._voucherService.createNewVoucherRegular(voucher).subscribe(
        response => {
          console.log("Se registro la solicitud del vehiculo correctamente");
          this.voucher =new VoucherGasolineI("",0,"","","","")

        }, err => {
          console.log(err.error.data)
        }
      )
    } else {
      console.log("Hubo un error al registro la solicitud del vehiculo");
    }
  }

}
