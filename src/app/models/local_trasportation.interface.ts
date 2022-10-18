export class localtrasportationI{
    constructor(
      public pilotName:string,
      public plate:string,
      public place:string,
      public date:string,
      public section: string,
      public applicantsName:string,
      public position:string,
      public phoneNumber:number,
      public observations:string,
      public detail: Array<any> = []
    )
    {
  
    }
  }
  