import { PersonService } from './../../../../services/person.service';
import { UsersService } from './../../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UserI } from 'src/app/models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  //TODO ARRIBA DEL CONSTRUCTOR SE DECLARAN VARIABLES
  //TODO DECLARAMOS LA DEL NG MODEL LE COLOCAMOS COMO SE LLAMA NUESTRO COMPONENTE
  public user;
  public rols;
  public type_status;
  public editing: boolean = false;
  public id_entrada;
  public persons;

  constructor(private _infoService: InfoService,
    private _UserService: UsersService,
    private _route: ActivatedRoute,
    private _persons: PersonService,
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
    if (this.editing) {
      const user: UserI = {
        username: userForm.value.username,
        password: userForm.value.password,
        rol_id: userForm.value.rol_id,
        uuidPerson: userForm.value.uuidPerson,

      }
      // if (userForm.valid) {
      //   this._UserService.updateOneUser(user, this.id_entrada).subscribe(
      //     data => {
      //       console.log("Usuario actualizado correctamente");
      //     },
      //     error => {
      //       console.log(error.error.data)
      //     })
      // } else {
      //   console.log('Complete Correctamente el Formulario');
      // }

    } else {
      this.editing = false;
      const user: UserI = {
        username: userForm.value.username,
        password: userForm.value.password,
        rol_id: userForm.value.rol_id,
        uuidPerson: userForm.value.uuidPerson,

      }
      if (userForm.valid) {
        this._UserService.createNewUser(user).subscribe(
          response => {
            console.log("Se registro el Usuario correctamente");
            this.user = new UserI('', '', '', '');
          },
          error => {
            console.log(error.error.data)
          }
        );
      } else {
        console.log("Complete Correctamente el Formulario");
      }
    }
  }
}
