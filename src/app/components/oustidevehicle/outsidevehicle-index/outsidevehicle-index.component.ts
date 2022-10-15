import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outsidevehicle-index',
  templateUrl: './outsidevehicle-index.component.html',
  styleUrls: ['./outsidevehicle-index.component.css']
})
export class OutsidevehicleIndexComponent implements OnInit {
  public foreigntransport;
  public p:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
