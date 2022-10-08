import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { VehiclesMantComponent } from './components/vehicles/vehicles-mant/vehicles-mant.component';
import { VehiclesIndexComponent } from './components/vehicles/vehicles-index/vehicles-index.component';
import { UsersComponent } from './components/features/users/users.component';
import { TransportRequestComponent } from './components/features/transport-request/transport-request.component';
import { ManagerviewComponent } from './components/features/managerview/managerview.component';
import { RequestListComponent } from './components/features/request-list/request-list.component';
import { AssignVPComponent } from './components/features/assign-v-p/assign-v-p.component';
import { LocalTransportationRequestComponent } from './components/features/local-transportation-request/local-transportation-request.component';

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
    LocalTransportationRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
