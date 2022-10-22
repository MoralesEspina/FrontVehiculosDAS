import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SweetAlertService {

  constructor(
  ) {

  }
  //TODO ESTATUS DE RESPUESTA ESPERADO 200
  createAndUpdate(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
  }

  deleteOneConfirmation(titulo) {
    Swal.fire({
      icon: 'success',
      title: titulo,
    })
  }

  deleteOneError(titulo, error) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: error,
    })
  }

  error(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
  }

  warning(titulo) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: titulo,
      showConfirmButton: false,
      timer: 1000
    })
  }

}
