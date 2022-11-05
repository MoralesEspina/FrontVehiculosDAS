export class LocalRequestI{
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
      public status:string,
      public detail: Array<any> = []
    )
    {

    }
  }
