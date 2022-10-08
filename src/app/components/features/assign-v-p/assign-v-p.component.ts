import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-v-p',
  templateUrl: './assign-v-p.component.html',
  styleUrls: ['./assign-v-p.component.css']
})
export class AssignVPComponent implements OnInit {

  public p:number = 1;
  public productos = ["Prueba", "Prueba2", "Prueba3"]
  constructor() { }

  ngOnInit(): void {
  }

}

