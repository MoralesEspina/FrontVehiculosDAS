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
    icon: 'fal fa-user',
    label: 'Usuarios'
  },
  {
    routeLink: 'persontable',
    icon: 'fal fa-users',
    label: 'Personas'
  },



  {
    routeLink: 'solicitud local',
    icon: 'fal fa-route',
    label: 'Solicitudes de transporte local',
    items: [
      {
        routeLink: 'localRequest-index',
        icon: 'fal fa-list',
        label: 'Lista de solicitudes de transporte local',

      },
      {
        routeLink: 'localRequest/add',
        icon: 'fal fa-list',
        label: 'Crear solicitud de transporte local'
      },
    ]
  },

  {
    routeLink: 'solicitud exterior',
    icon: 'fal fa-city',
    label: 'Solicitudes de transporte exterior',
    items: [
      {
        routeLink: 'exteriorRequest-index',
        icon: 'fal fa-list',
        label: 'Lista de solicitudes de transporte exterior'
      },
      {
        routeLink: 'exteriorRequest/add',
        icon: 'fal fa-list',
        label: 'Crear solicitud de transporte exterior'
      },
    ]
  },

  {
    routeLink: 'viajes',
    icon: 'fal fa-car',
    label: 'Viajes'
  },

]
