import { PersonI } from './../../../models/person.interface';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from './../../../services/info.service';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  public personform;
  public types;
  public type_status;
  public editing: boolean = false;
  public id_entrada;


  constructor(private _infoService: InfoService,
              private _personService: PersonService,
              private _route: ActivatedRoute)
              {
                this.personform = new PersonI('','','','','','',);
              }

              ngOnInit(): void {
                this.id_entrada = this._route.snapshot.params['id'];
                this.loadPerson();
                if (this.id_entrada) {

                }else{
                    this.getTypes();
                    this.getStatus();
                }

              }

              loadPerson(){
                if (this.id_entrada) {
                  this.editing = true;
                  this._personService.getOnePerson(this.id_entrada).subscribe(
                    response => {
                      this.personform = response.data[0]
                      this.getTypes();
                      this.getStatus();
                    },
                    error => {
                    }
                  )
                } else {
                  this.editing = false;
                }
              }

              getTypes() {
                this._infoService.getTypes().subscribe(
                  response => {
                    this.types = response.data;
                  }, error => {
                  }
                )
              }

              getStatus() {
                this._infoService.getStatus().subscribe(
                  response => {
                    this.type_status = response.data;
                  }, error => {
                  }
                )
              }

              createNewPerson(personForm){
                if (this.editing) {
                  const vehicle: PersonI = {
                    vin: this.id_entrada,
                    fullname: personForm.value.fullname,
                    job: personForm.value.job,
                    pone: personForm.value.pone,
                    dpi: personForm.value.dpi,
                    nit: personForm.value.nit,
                  }
                  if (personForm.valid) {
                    this._personService.updateOnePerson(vehicle, this.id_entrada).subscribe(
                      data => {
                       console.log("Persona actualizado correctamente") ;
                      },
                      error => {
                        console.log(error.error.data)
                      })
                  } else {
                    console.log('Complete Correctamente el Formulario');
                  }
                } else {
                  this.editing = false;
                  const personform: PersonI = {
                  vin: personForm.value.vin,
                  fullname: personForm.value.fullname,
                  job: personForm.value.job,
                  pone: personForm.value.pone,
                  dpi: personForm.value.dpi,
                  nit: personForm.value.nit,
                }
                console.log("Se registro persona correctamente");
                if (personForm.valid) {
                  this._personService.createNewPerson(personform).subscribe(
                    response => {
                      console.log("Se registro el vehiculo correctamente");
                      this.personform = new PersonI('','','','','','');
                    }, error => {
                      console.log(error.error.data)
                    }
                  );
                } else {
                    console.log("Complete Correctamente el Formulario");
                }
              }
            }


}
