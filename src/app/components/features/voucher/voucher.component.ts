import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VoucherI } from 'src/app/models/voucher.interface';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';

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
    ) {
      this.voucher=new VoucherI("","","","","","","","","","")
     }

  ngOnInit(): void {
    this.getPerson();
    this.getVehicles();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
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




  createLocalRequest(voucherForm) {
    const voucher: VoucherI = {
      date: this.todayWithPipe,
      cost:voucherForm.value.cost,
      id_vehicle: voucherForm.value.plate,
      comission: voucherForm.value.comission,
      objective: voucherForm.value.objective,
      id_pilot: voucherForm.value.pilot,
      galon: voucherForm.value.galon,
      service:voucherForm.value.service,
      comission_date: this.todayWithPipe,//agregarle fecha
      km:voucherForm.value.km,

    }
  }





}
