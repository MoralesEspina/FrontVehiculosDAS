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
    routeLink: 'exteriorRequest-index',
    icon: 'fal fa-list',
    label: 'Lista de solicitudes de transporte exterior'
  },
  {
    routeLink: 'exteriorRequest/add',
    icon: 'fal fa-list',
    label: 'Crear solicitud de transporte exterior'
  },

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
  {
    routeLink: '',
    icon: 'fal fa-print',
    label: 'Solicitudes de Transporte',
    items: [

      {
        routeLink: '',
        icon: 'fal fa-list',
        label: 'Solicitudes de transporte local',
        items:[
          {
            routeLink: 'localRequest-index',
            icon: 'fal fa-list',
            label: 'Lista de solicitudes de transporte local',

          },
          {
            routeLink: 'localRequest',
            icon: 'fal fa-list',
            label: 'Crear solicitud de transporte local'
          },
        ]
      },

      {
        routeLink: '',
        icon: 'fal fa-list',
        label: 'Solicitudes de transporte exterior',
        items:[
          {
            routeLink: 'exteriorRequest-index',
            icon: 'fal fa-list',
            label: 'Lista de solicitudes de transporte exterior'
          },
          {
            routeLink: 'exteriorRequest',
            icon: 'fal fa-list',
            label: 'Crear solicitud de transporte exterior'
          },
        ]
      },
    ]

  },




]
