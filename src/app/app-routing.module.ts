import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO IMPORTS VISTAS
import { AssignVPComponent } from './components/features/assign-v-p/assign-v-p.component';
import { ManagerviewComponent } from './components/features/managerview/managerview.component';
import { RequestListComponent } from './components/features/request-list/request-list.component';
import { TransportRequestComponent } from './components/features/transport-request/transport-request.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//TODO --------------------
//TODO VEHICULOS
import { VehiclesIndexComponent } from './components/features/vehicles/vehicles-index/vehicles-index.component';
import { VehiclesMantComponent } from './components/features/vehicles/vehicles-mant/vehicles-mant.component';
//TODO REPORTE DE VEHICULOS
import { ReportsVehiclesComponent } from './components/features/reports-vehicles/reports-vehicles.component';
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
import { FuelVoucherComponent } from './components/pdf´s/fuel-voucher/fuel-voucher.component';
import { ExteriorRequestPdfComponent } from './components/pdf´s/exterior-request-pdf/exterior-request-pdf.component';
import { LocalRequestPdfComponent } from './components/pdf´s/local-request-pdf/local-request-pdf.component';
import { UsersIndexComponent } from './components/features/users/users-index/users-index.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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


  //TODO RUTAS DE SOLICITUD EXTERIOR
  { path: 'exteriorRequest-index', component: ExteriorRequestIndexComponent },
  { path: 'exteriorRequest/add', component: ExteriorRequestMantComponent },
  { path: 'exteriorRequest/edit/:id', component: ExteriorRequestMantComponent },


  //TODO RUTAS PERSONA
  { path: 'personform', component: PersonFormComponent },
  { path: 'persontable', component: PersonTableComponent },

  //TODO RUTAS USUARIOS
  { path: 'users', component: UsersComponent },
  { path: 'users-index', component: UsersIndexComponent },

  //TODO RUTAS PDF'S
  { path: 'FuelVoucher', component: FuelVoucherComponent },
  { path: 'ExteriorRequestPDF', component: ExteriorRequestPdfComponent },
  { path: 'LocalRequestPDF', component: LocalRequestPdfComponent },


  { path: 'transportRequest', component: TransportRequestComponent },
  { path: 'requestList', component: RequestListComponent },
  { path: 'reportsVehicles', component: ReportsVehiclesComponent },
  { path: 'managerView', component: ManagerviewComponent },
  { path: 'assignVP', component: AssignVPComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
