import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Rol } from './models/rol.model';
//TODO IMPORTS VISTAS
import { ManagerviewComponent } from './components/features/managerview/managerview.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//TODO --------------------
//TODO VEHICULOS
import { VehiclesIndexComponent } from './components/features/vehicles/vehicles-index/vehicles-index.component';
import { VehiclesMantComponent } from './components/features/vehicles/vehicles-mant/vehicles-mant.component';
//TODO PERSONAS
import { PersonFormComponent } from './components/features/person/person-form/person-form.component';
import { PersonTableComponent } from './components/features/person/person-table/person-table.component';
//TODO SOLICITUDES
import { HistoryRequestComponent } from './components/features/history-request/history-request.component';
import { ExteriorRequestIndexComponent } from './components/features/exterior-request/exterior-request-index/exterior-request-index.component';
import { ExteriorRequestMantComponent } from './components/features/exterior-request/exterior-request-mant/exterior-request-mant.component';
import { LocalRequestIndexComponent } from './components/features/local-request/local-request-index/local-request-index.component';
import { LocalRequestMantComponent } from './components/features/local-request/local-request-mant/local-request.component';
//TODO USUARIOS
import { UsersComponent } from './components/features/users/users-mant/users.component';
//TODO PDF'S
import { ExteriorRequestPdfComponent } from './components/pdfs/exterior-request-pdf/exterior-request-pdf.component';
import { LocalRequestPdfComponent } from './components/pdfs/local-request-pdf/local-request-pdf.component';
import { UsersIndexComponent } from './components/features/users/users-index/users-index.component';
import { LoginComponent } from './components/login/login.component';
import { VoucherPdfComponent } from './components/pdfs/voucher-diesel-pdf/voucher-pdf.component';
import { VoucherRegularPdfComponent } from './components/pdfs/voucher-regular-pdf/voucher-regular-pdf.component';
import { ExitPassPdfComponent } from './components/pdfs/exit-pass-pdf/exit-pass-pdf.component';
import { BinnaclePdfComponent } from './components/pdfs/binnacle-pdf/binnacle-pdf.component';
//TODO VIAJES
import { TripsComponent } from './components/features/trips/trips.component';
//TODO VOUCHERS
import { VoucherComponent } from './components/features/voucher/voucherGas/voucher.component';
import { VoucherDieselComponent } from './components/features/voucher/voucher-diesel/voucher-diesel.component';
import { VoucherIndexComponent } from './components/features/voucher/voucher-index/voucher-index.component';

import { LoginGuard } from './login.guard';
import { TripsHistoryComponent } from './components/features/trips-history/trips-history.component';
import { AuthGuard } from './guards/auth.guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  //TODO RUTAS VEHICULOS
  { path: 'vehicles', component: VehiclesIndexComponent,  canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'vehicles/add', component: VehiclesMantComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'vehicles/edit/:id', component: VehiclesMantComponent,canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  //TODO RUTAS DE SOLICITUDES
  { path: 'History-Request', component: HistoryRequestComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },

  //TODO RUTAS DE SOLICITUD LOCAL
  { path: 'localRequest-index', component: LocalRequestIndexComponent, canActivate: [AuthGuard] },
  { path: 'localRequest/add', component: LocalRequestMantComponent, canActivate: [AuthGuard] },
  { path: 'localRequest/edit/:id', component: LocalRequestMantComponent, canActivate: [AuthGuard]},
  { path: 'localRequest/pdf/:id', component: LocalRequestPdfComponent, canActivate: [AuthGuard]},

  //TODO RUTAS DE SOLICITUD EXTERIOR
  { path: 'exteriorRequest-index', component: ExteriorRequestIndexComponent, canActivate: [AuthGuard]  },
  { path: 'exteriorRequest/add', component: ExteriorRequestMantComponent, canActivate: [AuthGuard] },
  { path: 'exteriorRequest/edit/:id', component: ExteriorRequestMantComponent, canActivate: [AuthGuard] },
  { path: 'exteriorRequest/pdf/:id', component: ExteriorRequestPdfComponent, canActivate: [AuthGuard]},

  //TODO RUTAS PERSONA
  { path: 'personform', component: PersonFormComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'persontable', component: PersonTableComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'personform/edit/:id', component: PersonFormComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },

  //TODO RUTAS USUARIOS
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin] } },
  { path: 'users-index', component: UsersIndexComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin] } },
  { path: 'users/edit/:id', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin] } },

  //TODO RUTAS PDF'S
  { path: 'ExteriorRequestPDF', component: ExteriorRequestPdfComponent, canActivate: [AuthGuard]},
  { path: 'LocalRequestPDF', component: LocalRequestPdfComponent, canActivate: [AuthGuard] },
  { path: 'voucherDieselPDF/:id', component: VoucherPdfComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'voucherRegularPDF/:id', component: VoucherRegularPdfComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'exitPassPDF/:id', component: ExitPassPdfComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },

  //TODO VIAJES
  { path: 'Trips', component: TripsComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] }  },
  { path: 'History-trips', component: TripsHistoryComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] }  },

  //TODO VALES
  { path: 'VoucherGasoline', component: VoucherComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] }  },
  { path: 'VoucherDiesel', component:VoucherDieselComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },
  { path: 'Vouchertable', component: VoucherIndexComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] } },

  //TODO BITACORA
  { path: 'Bitacora', component: BinnaclePdfComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] }  },
  { path: 'Binnacle/:id', component: BinnaclePdfComponent, canActivate: [AuthGuard], data: { roles: [Rol.admin, Rol.boss] }  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
