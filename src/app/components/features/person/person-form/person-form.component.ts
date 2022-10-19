import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { InfoService } from 'src/app/services/info.service';
import { PersonI } from 'src/app/models/person.interface';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  public personform;
  public editing: boolean = false;
  public id_entrada;

  constructor(private _infoService: InfoService,
              private _personService: PersonService,
              private _route: ActivatedRoute)
              {
                this.personform = new PersonI('',0,'','','');
              }

              ngOnInit(): void {
                this.id_entrada = this._route.snapshot.params['id'];
                this.loadPerson();
                if (this.id_entrada) {

                }

              }

              loadPerson(){
                if (this.id_entrada) {
                  this.editing = true;
                  this._personService.getOnePerson(this.id_entrada).subscribe(
                    response => {
                      this.personform = response.data[0]

                    },
                    error => {
                    }
                  )
                } else {
                  this.editing = false;
                }
              }




              createNewPerson(personForm){
                if (this.editing) {
                  const person: PersonI = {

                    fullname: personForm.value.fullname,
                    job: personForm.value.job,
                    phone: personForm.value.phone,
                    dpi: personForm.value.dpi,
                    nit: personForm.value.nit,
                  }
                  if (personForm.valid) {
                    this._personService.updateOnePerson(person, this.id_entrada).subscribe(
                      data => {
                       console.log("Persona actualizada correctamente") ;
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

                  fullname: personForm.value.fullname,
                  job: personForm.value.job,
                  phone: personForm.value.phone,
                  dpi: personForm.value.dpi,
                  nit: personForm.value.nit,
                }
                console.log("Se creo la persona correctamente");
                if (personForm.valid) {
                  this._personService.createNewPerson(personform).subscribe(
                    response => {
                      console.log("Se creo la persona correctamente");
                      this.personform = new PersonI('',0,'','','');
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
