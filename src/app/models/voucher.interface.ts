export class VoucherDieselI{
    constructor(
    public date:string,
    public cost:number,
    public id_vehicle: string,
    public comission_to:string,
    public objective:string,
    public id_pilot:string,
    public km_gallon:number,
    public service_of: string,
    public comission_date:string,
    public km_to_travel:number,
    )
    {
  
    }
  }
  export class VoucherGasolineI{
    constructor(
    public date:string,
    public cost:number,
    public id_vehicle: string,
    public comission_to:string,
    public objective:string,
    public id_pilot:string,
    )
    {
  
    }
  }
  