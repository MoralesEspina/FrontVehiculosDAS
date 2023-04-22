import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';


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
      icon: 'fa fa-clipboard-list-check ',
      router: 'localRequest-index'
    },
    {
      number: '6',
      name: 'Solicitudes Exteriores',
      icon: 'fa fa-clipboard-list-check ',
      router: 'exteriorRequest-index'
    },
    {
      number: '7',
      name: 'Viajes',
      icon: 'fa fa-road ',
      router: 'viajes'
    },
    {
      number: '8',
      name: 'Vales de Combustible',
      icon: 'fa fa-list',
      router: 'Vouchertable'
    },

  ]
  ngOnInit(): void {
  }

}
