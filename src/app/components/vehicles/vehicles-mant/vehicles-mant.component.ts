import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles-mant.component.html',
  styleUrls: ['./vehicles-mant.component.css']
})
export class VehiclesMantComponent implements OnInit {

  //TODO ARRIBA DEL CONSTRUCTOR SE DECLARAN VARIABLES
  //TODO DECLARAMOS LA DEL NG MODEL LE COLOCAMOS COMO SE LLAMA NUESTRO COMPONENTE
  public vehicle;
  constructor() { }

  ngOnInit(): void {
  }

}
