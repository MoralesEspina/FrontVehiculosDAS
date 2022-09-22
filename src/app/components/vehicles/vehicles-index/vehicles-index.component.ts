import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles-index',
  templateUrl: './vehicles-index.component.html',
  styleUrls: ['./vehicles-index.component.css']
})
export class VehiclesIndexComponent implements OnInit {

  public p:number = 1;
  public productos = ["Prueba", "Prueba2", "Prueba3"]
  constructor() { }

  ngOnInit(): void {
  }

}
