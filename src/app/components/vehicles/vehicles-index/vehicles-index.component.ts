import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles-index',
  templateUrl: './vehicles-index.component.html',
  styleUrls: ['./vehicles-index.component.css']
})
export class VehiclesIndexComponent implements OnInit {

  public p:number = 1;
  public vehicles;
  constructor(private _vehicleService: VehicleService,) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(){
    this._vehicleService.getVehicles().subscribe(
      response =>{
        console.log(response)
        this.vehicles = response.data;
      }, error =>{

      }
    )
  }
}
