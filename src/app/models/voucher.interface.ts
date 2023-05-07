import { publishFacade } from "@angular/compiler";

export class VoucherDieselI{
    constructor(
    public date:string,
    public cost:string,
    public idVehicle: string,
    public comission_to:string,
    public objective:string,
    public id_pilot:string,
    public km_to_travel:string,
    public idtrips: string,
    )
    {

    }
  }
  export class VoucherGasolineI{
    constructor(
    public date:string,
    public cost:number,
    public idVehicle: string,
    public comission_to:string,
    public objective:string,
    public id_pilot:string,
    public km_to_travel:string,
    public idtrips: string,
    )
    {

    }
  }
