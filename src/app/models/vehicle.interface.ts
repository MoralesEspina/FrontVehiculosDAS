export class VehicleI{
  constructor(
    public vin:string,
    public plate:string,
    public type: string,
    public brand:string,
    public model:number,
    public km:number,
    public gas:string,
    public status:string,
  )
  {

  }
}
