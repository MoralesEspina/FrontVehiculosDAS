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
  {

  }
}
