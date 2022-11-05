import { PersonService } from './../../../../services/person.service';
import { UsersService } from './../../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UserI } from 'src/app/models/user.interface';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public user;
  public rols;
  public type_status;
  public editing: boolean = false;
  public id_entrada;
  public persons;
  public data_response;

  constructor(
    private _infoService: InfoService,
    private _UserService: UsersService,
    private _route: ActivatedRoute,
    private _persons: PersonService,
    private _sweetAlertService: SweetAlertService,
    private _errorService: ErrorsService,
    private _router: Router
  ) {
    this.user = new UserI('', '', '', '');
  }

  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.loadOneUser();
    if (this.id_entrada) {
    } else {
      this.getRols();
      this.getPersons();
    }
  }

  getRols() {
    this._infoService.getRols().subscribe(
      response => {
        this.rols = response.data;
      }, error => {
      }
    )
  }

  getPersons() {
    this._persons.getPerson().subscribe(
      response => {
        this.persons = response.data;
      }, error => {
      }
    )
  }

  loadOneUser() {
    if (this.id_entrada) {
      this.editing = true;
      this._UserService.getOneUser(this.id_entrada).subscribe(
        response => {
          this.user = response.data[0]
          this.getRols();
          this.getPersons();
        },
        error => {
        }
      )
    } else {
      this.editing = false;
    }
  }

  createNewUser(userForm) {
    const user: UserI = {
      username: userForm.value.username,
      password: userForm.value.password,
      rol_id: userForm.value.rol_id,
      uuidPerson: userForm.value.uuidPerson,
    }

    if (!userForm.valid) {
      this._sweetAlertService.warning('Complete correctamente el formulario');
      return
    }

    if (this.editing) {
        this._UserService.updateOneUser(user, this.id_entrada).subscribe(
          data => {
            this._sweetAlertService.createAndUpdate('Editado correctamente');
            this._router.navigate(['users-index'])
          },
          error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
          })
    } else {
      this.editing = false;
      this._UserService.createNewUser(user).subscribe(
        response => {
          this._sweetAlertService.createAndUpdate('Se registro correctamente');
          this.user = new UserI('', '', '', '');
          this._router.navigate(['users-index'])
        },
        error => {
          this.data_response = error;
          this._errorService.error(this.data_response);
        }
      );
    }
  }
}
