import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  public p:number = 1;
  public productos = ["Prueba", "Prueba2", "Prueba3"]
  constructor() { }

  ngOnInit(): void {
  }

}
