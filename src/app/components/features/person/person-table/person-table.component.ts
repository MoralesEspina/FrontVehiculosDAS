import { PersonService } from 'src/app/services/person.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  public jobs
  public p:number = 1;
  public person;

  constructor(private _infoService: InfoService,
              private _personServicetab: PersonService,) { }

  ngOnInit(): void {
    this.getPerson();


  }
  getPerson(){
    this._personServicetab.getPerson().subscribe(
      response =>{
        console.log(response)
        this.person = response.data;
      }, error =>{

      }
    )
  }

  getJobs() {
    this._infoService.getJobs().subscribe(
      response => {
        this.jobs = response.data;
      }, error => {
      }
    )
  }


  delePerson(id){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._personServicetab.deleteOnePerson(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'Persona Eliminada con Exito',
            'success'
          )
          this.getPerson();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'No se ha podido eliminar el registro',
            text: error.error.data,
          })
        });
      }
    })
  }

}
