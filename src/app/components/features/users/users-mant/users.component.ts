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
  public types;
  public type_status;
  public editing: boolean = false;
  public id_entrada;

  constructor(private _infoService: InfoService,
    private _UserService: UsersService,
    private _route: ActivatedRoute
  ) {

    this.user = new UserI('', '', '', '');
  }

  ngOnInit(): void {
    this.getRols();

  }

  getRols() {
    this._infoService.getRols().subscribe(
      response => {
        this.types = response.data;
      }, error => {
      }
    )
  }

  createNewUser(userForm) {
    if (this.editing) {
      const user: UserI = {
        username: userForm.value.username,
        password: userForm.value.password,
        rol_id: userForm.value.rol_id,
        uuidPerson: userForm.value.uuidPerson,

      }

    } else {
      this.editing = false;
      const user: UserI = {
        username: userForm.value.username,
        password: userForm.value.password,
        rol_id: userForm.value.rol_id,
        uuidPerson: userForm.value.uuidPerson,

      }

      console.log("Se registro el vehiculo correctamente");
      if (userForm.valid) {
        this._UserService.createNewUser(user).subscribe(
          response => {
            console.log("Se registro el vehiculo correctamente");
            this.user = new UserI('', '', '', '');
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
