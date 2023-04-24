import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { UsersService } from 'src/app/services/users.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit {
  active: boolean = false;
  isClicked: boolean = true;
  showSubnivel = false;

  list = [
    {
      number: '1',
      name: 'Inicio',
      icon: 'fa fal fa-home',
      router: 'dashboard'
    },
    {
      number: '2',
      name: 'Vehiculos',
      icon: 'fa fa-cars',
      router: 'vehicles'
    },
    {
      number: '3',
      name: 'Personas',
      icon: 'fa fa-user-tie ',
      router: 'persontable'
    },
    {
      number: '4',
      name: 'Usuarios',
      icon: 'fa  fa-users',
      router: 'users-index'
    },
    {
      number: '5',
      name: 'Solicitudes Locales',
      icon: 'fa fa-file-spreadsheet ',
      router: 'localRequest-index'
    },
    {
      number: '6',
      name: 'Solicitudes Exteriores',
      icon: 'fa fa-file-contract ',
      router: 'exteriorRequest-index'
    },
    {
      number: '7',
      name: 'Historial de Solicitudes',
      icon: 'fa fa-list ',
      router: 'History-Request'
    },
    {
      number: '8',
      name: 'Viajes',
      icon: 'fa fa-road ',
      router: 'Trips'
    },
    {
      number: '9',
      name: 'Vales de Combustible',
      icon: 'fa fa-gas-pump',
      router: 'Vouchertable'
    },
    

  ]
  user: any;
  constructor(private _sweetAlert:SweetAlertService){

  }

  ngOnInit(): void {
    console.log(localStorage.getItem('rol')); 
    this.user = localStorage.getItem('rol');
  }

  toggleSubnivel() {
    this.showSubnivel = !this.showSubnivel;
  }
  
  logOut(){
    localStorage.removeItem('rol')
    localStorage.removeItem('Token');
    this._sweetAlert.logout('Adios!');
  }

  DisplayNone() {
    this.active = !this.active
    this.isClicked = !this.isClicked
  }
}
