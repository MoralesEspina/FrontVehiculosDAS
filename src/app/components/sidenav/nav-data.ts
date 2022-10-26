import { INavbarData } from "./helper";

export const navabarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routeLink: 'vehicles',
    icon: 'fal fa-cars',
    label: 'Vehiculos'
  },
  {
    routeLink: 'users-index',
    icon: 'fal fa-users',
    label: 'Usuarios'
  },
  {
    routeLink: 'persontable',
    icon: 'fas  fa-user-tie',
    label: 'Personas'
  },




  {
    routeLink: 'localRequest-index',
    icon: 'fal fa-clipboard-list-check',
    label: 'Lista de solicitudes de transporte local',

  },
  {
    routeLink: 'localRequest/add',
    icon: 'fal fa-car-side',
    label: 'Crear solicitud de transporte local'
  },



  {
    routeLink: 'exteriorRequest-index',
    icon: 'fal fa-clipboard-list-check',
    label: 'Lista de solicitudes de transporte exterior'
  },
  {
    routeLink: 'exteriorRequest/add',
    icon: 'fal fa-car-building',
    label: 'Crear solicitud de transporte exterior'
  },

  {
    routeLink: 'viajes',
    icon: 'fal fa-road',
    label: 'Viajes'
  },

]
