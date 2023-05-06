export class LocalRequestI{
    constructor(
      public pilotName:string,
      public plate:string,
      public place:string,
      public date:string,
      public section: string,
      public applicantsName:string,
      public position:string,
      public phoneNumber:string,
      public observations:string,
      public status:string,
      public reason_rejected: string,
      public created_by: any,
      public detail: Array<any> = []
    )
    {

    }
  }
