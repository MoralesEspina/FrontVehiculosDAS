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


const routes: Routes = [
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login',component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  //TODO RUTAS VEHICULOS
  { path: 'vehicles', component: VehiclesIndexComponent },
  { path: 'vehicles/add', component: VehiclesMantComponent },
  { path: 'vehicles/edit/:id', component: VehiclesMantComponent },
  //TODO RUTAS DE SOLICITUDES
  //TODO RUTAS DE SOLICITUD LOCAL
  { path: 'localRequest-index', component: LocalRequestIndexComponent },
  { path: 'localRequest/add', component: LocalRequestMantComponent },
  { path: 'localRequest/edit/:id', component: LocalRequestMantComponent },
  { path: 'localRequest/pdf/:id', component: LocalRequestPdfComponent },


  //TODO RUTAS DE SOLICITUD EXTERIOR
  { path: 'exteriorRequest-index', component: ExteriorRequestIndexComponent },
  { path: 'exteriorRequest/add', component: ExteriorRequestMantComponent },
  { path: 'exteriorRequest/edit/:id', component: ExteriorRequestMantComponent },
  { path: 'exteriorRequest/pdf/:id', component: ExteriorRequestPdfComponent },


  //TODO RUTAS PERSONA
  { path: 'personform', component: PersonFormComponent },
  { path: 'persontable', component: PersonTableComponent },
  { path: 'personform/edit/:id', component: PersonFormComponent },

  //TODO RUTAS USUARIOS
  { path: 'users', component: UsersComponent },
  { path: 'users-index', component: UsersIndexComponent },
  { path: 'users/edit/:id', component: UsersComponent },


  //TODO RUTAS PDF'S
  { path: 'FuelVoucher', component: FuelVoucherComponent },
  { path: 'ExteriorRequestPDF', component: ExteriorRequestPdfComponent },
  { path: 'LocalRequestPDF', component: LocalRequestPdfComponent },
  { path: 'voucherDieselPDF', component: VoucherPdfComponent },
  { path: 'voucherRegularPDF', component: VoucherRegularPdfComponent },

  { path: 'managerView', component: ManagerviewComponent },

  //TODO VIAJES
  { path: 'viajes', component: TripsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
