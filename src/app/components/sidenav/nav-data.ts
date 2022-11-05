import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
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
    routeLink: 'exteriorRequest-index',
    icon: 'fal fa-clipboard-list-check',
    label: 'Lista de solicitudes de transporte exterior'
  },

  {
    routeLink: 'viajes',
    icon: 'fal fa-road',
    label: 'Viajes'
  },
  {
    routeLink: 'Vouchertable',
    icon: 'fal fa-list',
    label: 'Lista de vales de combustibele'
  },

  {
    routeLink: 'logout',
    icon: 'fal fa-power-off',
    label: 'Cerrar Sesión'
  },



]
