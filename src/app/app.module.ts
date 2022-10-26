import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';

//TODO IMPORTS VISTAS
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import localeEs from '@angular/common/locales/es-GT'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'ES')
//TODO --------------------
import { ManagerviewComponent } from './components/features/managerview/managerview.component';
//TODO VEHICULOS
import { VehiclesMantComponent } from './components/features/vehicles/vehicles-mant/vehicles-mant.component';
import { VehiclesIndexComponent } from './components/features/vehicles/vehicles-index/vehicles-index.component';
//TODO PERSONAS
import { PersonTableComponent } from './components/features/person/person-table/person-table.component';
//TODO SOLICITUDES
import { LocalRequestIndexComponent } from './components/features/local-request/local-request-index/local-request-index.component';
import { LocalRequestMantComponent } from './components/features/local-request/local-request-mant/local-request.component';
import { ExteriorRequestIndexComponent } from './components/features/exterior-request/exterior-request-index/exterior-request-index.component';
import { ExteriorRequestMantComponent } from './components/features/exterior-request/exterior-request-mant/exterior-request-mant.component';
//TODO USUARIOS
import { UsersComponent } from './components/features/users/users-mant/users.component';
import { UsersIndexComponent } from './components/features/users/users-index/users-index.component';
//TODO PDF'S
import { FuelVoucherComponent } from './components/pdfs/fuel-voucher/fuel-voucher.component';
import { PersonFormComponent } from './components/features/person/person-form/person-form.component';
import { ExteriorRequestPdfComponent } from './components/pdfs/exterior-request-pdf/exterior-request-pdf.component';
import { LocalRequestPdfComponent } from './components/pdfs/local-request-pdf/local-request-pdf.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { LoginComponent } from './components/login/login.component';
//TODO VIAJES
import { TripsComponent } from './components/features/trips/trips.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    BodyComponent,
    VehiclesMantComponent,
    VehiclesIndexComponent,
    PersonTableComponent,
    UsersComponent,
    ManagerviewComponent,
    FuelVoucherComponent,
    UsersIndexComponent,
    ExteriorRequestIndexComponent,
    ExteriorRequestMantComponent,
    LocalRequestIndexComponent,
    LocalRequestMantComponent,
    ExteriorRequestIndexComponent,
    ExteriorRequestMantComponent,
    PersonFormComponent,
    ExteriorRequestPdfComponent,
    LocalRequestPdfComponent,
    SublevelMenuComponent,
    LoginComponent,
    TripsComponent
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

  providers: [{provide: LOCALE_ID, useValue: 'ES'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
