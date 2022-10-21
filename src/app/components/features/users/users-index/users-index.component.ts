import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { PersonService } from 'src/app/services/person.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  public rols
  public persons
  public p: number = 1;
  public users;
  constructor(private _infoService: InfoService,
              private _personService: PersonService,
              private _userService: UsersService,) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRols();
  }

  getUsers() {

    this._userService.getUsers().subscribe(
      response => {
        console.log(response)
        this.users = response.data;
      }, error => {

      }
    )
  }
  getPerson() {
    this._personService.getPerson().subscribe(
      response => {
        console.log(response)
        this.persons = response.data;
      }, error => {
      }
    )
  }

  getRols() {
    this._infoService.getRols().subscribe(
      response => {
        console.log(response)
        this.rols = response.data;
      }, error => {
      }
    )
  }

  // deleteUser(id){
  //   Swal.fire({
  //     title: 'Estas seguro?',
  //     text: "No podras revertir esta acción!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     cancelButtonText: 'No, Cancelar!',
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, Borralo!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._userService.deleteOneUser(id).subscribe(data => {
  //         Swal.fire(
  //           'Eliminado!',
  //           'Vehiculo Eliminado con Exito',
  //           'success'
  //         )
  //         this.getUsers();
  //       }, error => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'No se ha podido eliminar el producto',
  //           text: error.error.data,
  //         })
  //       });
  //     }
  //   })
  // }
}
