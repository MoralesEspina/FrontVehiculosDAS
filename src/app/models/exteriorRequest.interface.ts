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
      public status_request:string,
      public created_by: any,
      public detail: Array<any> = [],
      )
    {} }

  export class DetailExteriorRequestI{
    constructor(
        public number_people:string,
        public department:string,
        public municipality: string,
        public village:string,
        public dateOf:string,
        public dateTo:string,
        public hour:string,
    )
    {}}


