import { Component, OnInit } from '@angular/core';
import { localtrasportationI } from 'src/app/models/local_trasportation.interface';
import { dateillocaltrasportationI } from 'src/app/models/detaillocal-transportation.interface';
import { RequestlocalService } from 'src/app/services/requestlocal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-local-transportation-request',
  templateUrl: './local-transportation-request.component.html',
  styleUrls: ['./local-transportation-request.component.css']
})
export class LocalTransportationRequestComponent implements OnInit {

  public transportation;
  public datetransportation;
  public editing: boolean=false;
  public id_entrada;
  details:any[] = [];
  detailrequest:any = {};

  placess = [
    {id:7,name: 'Jalapa'},
    {id:1,name: 'Monjas'},
    {id:2,name: 'San Pedro Pinula'},
    {id:3,name: 'Mataquescuintla'},
    {id:4,name: 'San Luis Jilotepeque'},
    {id:5,name: 'San Manuel Chaparrón'},
    {id:6,name: 'San Carlos Alzatate'},
  ];



  constructor(private requestlocalService:RequestlocalService, private router:ActivatedRoute) {
    this.transportation=new localtrasportationI("","","","","","","",0,"",[])
   }

  ngOnInit(): void {
    this.id_entrada=this.router.snapshot.params['id'];
    this.loadlocaltransportation()
  }

  loadlocaltransportation(){
    if (this.id_entrada) {
      this.editing=true
      this.requestlocalService.getOnerequestLocal(this.id_entrada).subscribe(
        response=>{
         
          this.transportation=response.data[0]
          console.log(this.transportation)
    
        }, err=>{
    
        }
      )
      }else{
     this.editing=false
      }

  }

 
  

  create(local_trasportationForm){
  
    const transportation_local:localtrasportationI = {
      pilotName:  local_trasportationForm.value.pilotName,
      plate:  local_trasportationForm.value.plate,

       place: local_trasportationForm.value.place,
       date: local_trasportationForm.value.date,
       section: local_trasportationForm.value.section,
       applicantsName:  local_trasportationForm.value.applicantsName,
       position: local_trasportationForm.value.position,
       phoneNumber:  local_trasportationForm.value.phoneNumber,
       observations: local_trasportationForm.value.observations,
       detail:this.details
   }
   console.log(transportation_local)

   if (local_trasportationForm.valid) {
  this.requestlocalService.createonrequestLocal(transportation_local).subscribe(
    response=>{
      console.log("Se registro la solicitud del vehiculo correctamente");
      this.transportation=new localtrasportationI("","","","","","","",0,"",[])

    }, err=>{

    }
  )
  }else{
 console.log("Hubo un error al registro la solicitud del vehiculo");
  }
   }



  createdetail(trasportationForm){
  
    const person:dateillocaltrasportationI = {
      dateOf: trasportationForm.value.dateOf,
      dateTo: trasportationForm.value.dateTo,
      schedule: trasportationForm.value.schedule,
      destiny: trasportationForm.value.destiny,
      peopleNumber: trasportationForm.value.peopleNumber,
      comission:trasportationForm.value.comission
  }

  console.log(person)
    // se inserta el dato en el arreglo
    this.details.push(this.detailrequest);
    // se crea un nuevo objeto para almacenar nuevos datos
    this.detailrequest = {};

  }

}
