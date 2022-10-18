import { PersonTableComponent } from './components/person/person-table/person-table.component';
import { PersonFormComponent } from './components/person/person-form/person-form.component';
import { UsersComponent } from './components/features/users/users.component';
import { AssignVPComponent } from './components/features/assign-v-p/assign-v-p.component';
import { ManagerviewComponent } from './components/features/managerview/managerview.component';
import { RequestListComponent } from './components/features/request-list/request-list.component';
import { TransportRequestComponent } from './components/features/transport-request/transport-request.component';
import { VehiclesIndexComponent } from './components/vehicles/vehicles-index/vehicles-index.component';
import { VehiclesMantComponent } from './components/vehicles/vehicles-mant/vehicles-mant.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsVehiclesComponent } from './components/features/reports-vehicles/reports-vehicles.component';
import { LocalTransportationRequestComponent } from './components/features/local-transportation-request/local-transportation-request.component';
import { OutsidevehicleIndexComponent } from './components/oustidevehicle/outsidevehicle-index/outsidevehicle-index.component';
import { OutsidevehicleMantComponent } from './components/oustidevehicle/outsidevehicle-mant/outsidevehicle-mant.component';
import { LocalTransportationIndexComponent } from './components/features/local-transportation-index/local-transportation-index.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  //TODO RUTAS VEHICULOS
  {path: 'vehicles', component: VehiclesIndexComponent},
  {path: 'vehicles/add', component: VehiclesMantComponent},
  {path: 'vehicles/edit/:id', component: VehiclesMantComponent},
  //TODO RUTAS DE SOLICITUDES
  {path: 'transportRequest', component: TransportRequestComponent},
  {path: 'requestList', component: RequestListComponent},
  {path: 'reportsVehicles', component: ReportsVehiclesComponent},
  {path: 'managerView', component: ManagerviewComponent},
  {path: 'assignVP', component: AssignVPComponent},



{path: 'users', component: UsersComponent},
{path: 'OutsidevehicleIndex', component: OutsidevehicleIndexComponent},
{path: 'OutsidevehicleMant', component: OutsidevehicleMantComponent},


  //TODO RUTAS DE SOLICITUD LOCAL
  {path: 'localtransportRequest-index', component: LocalTransportationIndexComponent},
  {path: 'localtransportRequest/add', component: LocalTransportationRequestComponent},
  {path: 'localtransportRequest/edit/:id', component: LocalTransportationRequestComponent},
  {path: 'localtransportRequest', component: LocalTransportationRequestComponent},
  // RUTAS PERSONA
  {path: 'personform', component: PersonFormComponent},
  {path: 'persontable', component: PersonTableComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
