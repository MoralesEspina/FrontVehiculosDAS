import { VehiclesIndexComponent } from './components/vehicles/vehicles-index/vehicles-index.component';
import { VehiclesMantComponent } from './components/vehicles/vehicles-mant/vehicles-mant.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'vehicles', component: VehiclesIndexComponent},
  {path: 'vehicles/add', component: VehiclesMantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
