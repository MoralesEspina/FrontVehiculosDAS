export class ExteriorRequestI{
    constructor(
      public requesting_unit:string,
      public commission_manager:string,
      public date_request: string,
      public objective_request:string,
      public duration_days:string,
      public phoneNumber:string,
      public observations:string,
      public provide_fuel:number,
      public provide_travel_expenses:number,
      public plate_vehicle:string,
      public pilot_name:string,
      public reason_rejected:string,
    )
    {

    }
  }
