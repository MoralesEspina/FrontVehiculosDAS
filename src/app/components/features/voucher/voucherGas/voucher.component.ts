import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/components/features/voucher/voucher.component.ts
import { VoucherDieselI } from 'src/app/models/voucher.interface';
=======
import { VoucherDieselI, VoucherGasolineI } from 'src/app/models/voucher.interface';
>>>>>>> 283e7f1ccbe69083de3ea5db80003e9c8f545f5e:src/app/components/features/voucher/voucherGas/voucher.component.ts
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
<<<<<<< HEAD:src/app/components/features/voucher/voucher.component.ts
      this.voucher=new VoucherDieselI('',0,'','','','','','','','','','','','','','','')
=======

      this.voucher=new VoucherDieselI("","","","","","",0,"","",0)
>>>>>>> 283e7f1ccbe69083de3ea5db80003e9c8f545f5e:src/app/components/features/voucher/voucherGas/voucher.component.ts
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


<<<<<<< HEAD:src/app/components/features/voucher/voucher.component.ts


=======
  createVoucher(voucherForm) {
    const voucher: VoucherDieselI = {
      date: '',
      cost: '',
      id_vehicle: '',
      comission_to: '',
      objective: '',
      id_pilot: '',
      km_gallon: 0,
      service_of: '',
      comission_date: '',
      km_to_travel: 0
    } }
>>>>>>> 283e7f1ccbe69083de3ea5db80003e9c8f545f5e:src/app/components/features/voucher/voucherGas/voucher.component.ts
  createLocalRequest(voucherForm) {
    const voucher: VoucherDieselI = {
      date: this.todayWithPipe,
      cost:voucherForm.value.cost,
<<<<<<< HEAD:src/app/components/features/voucher/voucher.component.ts
      id_vehicle: voucherForm.value.plate,
=======
      id_vehicle: voucherForm.value.vin,
>>>>>>> 283e7f1ccbe69083de3ea5db80003e9c8f545f5e:src/app/components/features/voucher/voucherGas/voucher.component.ts
      comission_to: voucherForm.value.comission_to,
      objective: voucherForm.value.objective,

      id_pilot: voucherForm.value.pilot,
<<<<<<< HEAD:src/app/components/features/voucher/voucher.component.ts
      km_gallon: voucherForm.value.km_gallon,
      service_of:voucherForm.value.service_of,
      comission_date: this.todayWithPipe,//agregarle fecha
      km_to_travel:voucherForm.value.km_to_travel,
      type:'',
      brand:'',
      model:'',
      color:'',
      plate:'',
      fullname:'',
      dpi:'',
=======
      galon: voucherForm.value.galon,
      service:voucherForm.value.service,
      comission_date: this.todayWithPipe,//agregarle fecha
      km:voucherForm.value.km,
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
>>>>>>> 283e7f1ccbe69083de3ea5db80003e9c8f545f5e:src/app/components/features/voucher/voucherGas/voucher.component.ts
    }
  }

}
