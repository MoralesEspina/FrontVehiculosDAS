import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { VehiclesMantComponent } from './components/vehicles/vehicles-mant/vehicles-mant.component';
import { VehiclesIndexComponent } from './components/vehicles/vehicles-index/vehicles-index.component';
import { UsersComponent } from './components/features/users/users-mant/users.component';
import { TransportRequestComponent } from './components/features/transport-request/transport-request.component';
import { ManagerviewComponent } from './components/features/managerview/managerview.component';
import { RequestListComponent } from './components/features/request-list/request-list.component';
import { AssignVPComponent } from './components/features/assign-v-p/assign-v-p.component';

import { LocalTransportationRequestComponent } from './components/features/local-transportation-request/local-transportation-request.component';

import { ReportsVehiclesComponent } from './components/features/reports-vehicles/reports-vehicles.component';
import { LocalTransportationIndexComponent } from './components/features/local-transportation-index/local-transportation-index.component';
import { FuelVoucherComponent } from './components/pdf´s/fuel-voucher/fuel-voucher.component';
import { UsersIndexComponent } from './components/features/users/users-index/users-index.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    BodyComponent,
    VehiclesMantComponent,
    VehiclesIndexComponent,
    UsersComponent,
    TransportRequestComponent,
    ManagerviewComponent,
    RequestListComponent,
    AssignVPComponent,
    LocalTransportationRequestComponent,
    ReportsVehiclesComponent,
      LocalTransportationIndexComponent,
      FuelVoucherComponent,
      UsersIndexComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,

  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
