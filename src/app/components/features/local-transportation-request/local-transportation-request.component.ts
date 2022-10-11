import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-transportation-request',
  templateUrl: './local-transportation-request.component.html',
  styleUrls: ['./local-transportation-request.component.css']
})
export class LocalTransportationRequestComponent implements OnInit {

  places = [
    {name: 'Jalapa'},
    {name: 'Monjas'},
    {name: 'San Pedro Pinula'},
    {name: 'Mataquescuintla'},
    {name: 'San Luis Jilotepeque'},
    {name: 'San Manuel Chaparrón'},
    {name: 'San Carlos Alzatate'},
   
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
