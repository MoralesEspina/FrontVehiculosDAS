import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { ExteriorRequestIndexComponent } from './components/features/exterior-request/exterior-request-index/exterior-request-index.component';
import { ExteriorRequestMantComponent } from './components/features/exterior-request/exterior-request-mant/exterior-request-mant.component';
import { LocalRequestIndexComponent } from './components/features/local-request/local-request-index/local-request-index.component';
import { LocalRequestMantComponent } from './components/features/local-request/local-request-mant/local-request.component';
//TODO USUARIOS
import { UsersComponent } from './components/features/users/users-mant/users.component';
//TODO PDF'S
import { FuelVoucherComponent } from './components/pdfs/fuel-voucher/fuel-voucher.component';
import { ExteriorRequestPdfComponent } from './components/pdfs/exterior-request-pdf/exterior-request-pdf.component';
import { LocalRequestPdfComponent } from './components/pdfs/local-request-pdf/local-request-pdf.component';
import { UsersIndexComponent } from './components/features/users/users-index/users-index.component';
import { LoginComponent } from './components/login/login.component';
import { VoucherPdfComponent } from './components/pdfs/voucher-diesel-pdf/voucher-pdf.component';
import { VoucherRegularPdfComponent } from './components/pdfs/voucher-regular-pdf/voucher-regular-pdf.component';
//TODO VIAJES
import { TripsComponent } from './components/features/trips/trips.component';

import { VoucherComponent } from './components/features/voucher/voucherGas/voucher.component';
import { VoucherDieselComponent } from './components/features/voucher/voucher-diesel/voucher-diesel.component';
import { VoucherIndexComponent } from './components/features/voucher/voucher-index/voucher-index.component';


import { LoginGuard } from './login.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { BodyComponent } from './components/body/body.component';
import { ExitPassPdfComponent } from './components/pdfs/exit-pass-pdf/exit-pass-pdf.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent},
  { path: 'logout',component: LogoutComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  //TODO RUTAS VEHICULOS
  { path: 'vehicles', component: VehiclesIndexComponent, canActivate: [LoginGuard] },
  { path: 'vehicles/add', component: VehiclesMantComponent, canActivate: [LoginGuard] },
  { path: 'vehicles/edit/:id', component: VehiclesMantComponent, canActivate: [LoginGuard] },
  //TODO RUTAS DE SOLICITUDES
  //TODO RUTAS DE SOLICITUD LOCAL
  { path: 'localRequest-index', component: LocalRequestIndexComponent, canActivate: [LoginGuard] },
  { path: 'localRequest/add', component: LocalRequestMantComponent, canActivate: [LoginGuard] },
  { path: 'localRequest/edit/:id', component: LocalRequestMantComponent, canActivate: [LoginGuard] },
  { path: 'localRequest/pdf/:id', component: LocalRequestPdfComponent, canActivate: [LoginGuard] },


  //TODO RUTAS DE SOLICITUD EXTERIOR
  { path: 'exteriorRequest-index', component: ExteriorRequestIndexComponent, canActivate: [LoginGuard] },
  { path: 'exteriorRequest/add', component: ExteriorRequestMantComponent, canActivate: [LoginGuard] },
  { path: 'exteriorRequest/edit/:id', component: ExteriorRequestMantComponent, canActivate: [LoginGuard] },
  { path: 'exteriorRequest/pdf/:id', component: ExteriorRequestPdfComponent, canActivate: [LoginGuard] },


  //TODO RUTAS PERSONA
  { path: 'personform', component: PersonFormComponent, canActivate: [LoginGuard] },
  { path: 'persontable', component: PersonTableComponent, canActivate: [LoginGuard] },
  { path: 'personform/edit/:id', component: PersonFormComponent, canActivate: [LoginGuard] },

  //TODO RUTAS USUARIOS
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard] },
  { path: 'users-index', component: UsersIndexComponent, canActivate: [LoginGuard] },
  { path: 'users/edit/:id', component: UsersComponent, canActivate: [LoginGuard] },


  //TODO RUTAS PDF'S
  { path: 'FuelVoucher', component: FuelVoucherComponent, canActivate: [LoginGuard] },
  { path: 'ExteriorRequestPDF', component: ExteriorRequestPdfComponent, canActivate: [LoginGuard] },
  { path: 'LocalRequestPDF', component: LocalRequestPdfComponent, canActivate: [LoginGuard] },
  { path: 'voucherDieselPDF', component: VoucherPdfComponent, canActivate: [LoginGuard] },
  { path: 'voucherRegularPDF', component: VoucherRegularPdfComponent, canActivate: [LoginGuard] },
  { path: 'exitPassPDF', component: ExitPassPdfComponent, canActivate: [LoginGuard] },

  { path: 'managerView', component: ManagerviewComponent, canActivate: [LoginGuard] },

  //TODO VIAJES

  { path: 'Trips', component: TripsComponent },

  { path: 'viajes', component: TripsComponent, canActivate: [LoginGuard] },


  //TODO vales
  { path: 'VoucherGasoline', component: VoucherComponent },
  { path: 'VoucherDiesel', component:VoucherDieselComponent},
  { path: 'Vouchertable', component: VoucherIndexComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
