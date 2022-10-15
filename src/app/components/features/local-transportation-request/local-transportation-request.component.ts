import { Component, OnInit } from '@angular/core';
import { localtrasportationI } from 'src/app/models/local_trasportation.interface';
import { dateillocaltrasportationI } from 'src/app/models/detaillocal-transportation.interface';
import { RequestlocalService } from 'src/app/services/requestlocal.service';

@Component({
  selector: 'app-local-transportation-request',
  templateUrl: './local-transportation-request.component.html',
  styleUrls: ['./local-transportation-request.component.css']
})
export class LocalTransportationRequestComponent implements OnInit {

  public transportation;
  public datetransportation;

  placess = [
    {id:7,name: 'Jalapa'},
    {id:1,name: 'Monjas'},
    {id:2,name: 'San Pedro Pinula'},
    {id:3,name: 'Mataquescuintla'},
    {id:4,name: 'San Luis Jilotepeque'},
    {id:5,name: 'San Manuel Chaparrón'},
    {id:6,name: 'San Carlos Alzatate'},
  ];


 star=new Date()

  constructor(private requestlocalService:RequestlocalService) {
    this.transportation=new localtrasportationI("","","","","","","",0,"")
   }

  ngOnInit(): void {
  }


  

  create(local_trasportationForm){
  
    const transportation_local:localtrasportationI = {
      pilotName:  local_trasportationForm.value.pilotName,
      plate:  local_trasportationForm.value.plate,

       place: local_trasportationForm.value.place,
       dates: local_trasportationForm.value.dates,
       section: local_trasportationForm.value.section,
       applicantsName:  local_trasportationForm.value.applicantsName,
       position: local_trasportationForm.value.position,
       phoneNumber:  local_trasportationForm.value.phoneNumber,
       observations: local_trasportationForm.value.observations
   }
   console.log(transportation_local)

   if (local_trasportationForm.valid) {
  this.requestlocalService.createonrequestLocal(local_trasportationForm).subscribe(
    response=>{
      console.log("Se registro la solicitud del vehiculo correctamente");
      this.transportation=new localtrasportationI("","","","","","","",0,"")

    }, err=>{

    }
  )
  }else{
 console.log("Hubo un error al registro la solicitud del vehiculo");
  }
   }








   // los datos se van guardando en un arreglo, el cual se usa para
  // desplegar la tabla
  details:any[] = [];

  // los input del formulario se asocian con un modelo
  detail:any = {};
  createdetail(trasportationForm){
  
    const person:dateillocaltrasportationI = {
      dateDel: trasportationForm.value.dateDel,
      dateAl: trasportationForm.value.dateAl,
      schedule: trasportationForm.value.schedule,
      destiny: trasportationForm.value.destiny,
      numpeople: trasportationForm.value.numpeople,
      commission:trasportationForm.value.commission
  }

  console.log(person)
    // se inserta el dato en el arreglo
    this.details.push(this.detail);
    // se crea un nuevo objeto para almacenar nuevos datos
    this.detail = {};

  }

}
