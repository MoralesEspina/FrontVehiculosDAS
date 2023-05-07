import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { InfoService } from 'src/app/services/info.service';
import { PersonI } from 'src/app/models/person.interface';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  public personform;
  public editing: boolean = false;
  public id_entrada;
  public jobs;
  public data_response;
  public isLoad: boolean = false;


  constructor(private _infoService: InfoService,
              private _personService: PersonService,
              private _route: ActivatedRoute,
              private _sweetAlertService: SweetAlertService,
              private _errorService:ErrorsService,
              private _router:Router
              ) {
    this.personform = new PersonI('', '', '', '', '');
  }

  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.loadPerson();
    if (this.id_entrada) {

    } else {
      this.getJobs();
    }
  }
  getJobs() {
    this._infoService.getJobs().subscribe(
      response => {
        this.jobs = response.data;
      }, error => {
      }
    )
  }

  loadPerson() {
    if (this.id_entrada) {
      this.editing = true;
      this._personService.getOnePerson(this.id_entrada).subscribe(
        response => {
          this.personform = response.data[0]
          this.getJobs();
          this.isLoad = true;
        },
        error => {
        }
      )
    } else {
      this.editing = false;
      this.isLoad = true;
    }
  }




  createNewPerson(personForm) {
    const person: PersonI = {
      fullname: personForm.value.fullname,
      job: personForm.value.job,
      phone: personForm.value.phone,
      dpi: personForm.value.dpi,
      nit: personForm.value.nit,
    }

    if (!personForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }
    if (this.editing) {
        this._personService.updateOnePerson(person, this.id_entrada).subscribe(
          data => {
            this._sweetAlertService.createAndUpdate('Editado correctamente');
            this._router.navigate(['persontable'])
          },
          error => {
            this.data_response = error;
            this._errorService.error(this.data_response)
          })
    } else {
      this.editing = false;
        this._personService.createNewPerson(person).subscribe(
          response => {
            this._sweetAlertService.createAndUpdate('Se registro correctamente');
            this.personform = new PersonI('', '', '', '', '');
            this._router.navigate(['persontable'])
          }, error => {
            this.data_response = error;
            this._errorService.error(this.data_response);
          }
        );
    }

  }


}
