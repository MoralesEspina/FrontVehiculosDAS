import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-request',
  templateUrl: './transport-request.component.html',
  styleUrls: ['./transport-request.component.css']
})
export class TransportRequestComponent implements OnInit {

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
