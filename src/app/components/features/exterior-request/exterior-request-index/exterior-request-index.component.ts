import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exterior-request-index',
  templateUrl: './exterior-request-index.component.html',
  styleUrls: ['./exterior-request-index.component.css']
})
export class ExteriorRequestIndexComponent implements OnInit {
  public foreigntransport;
  public p:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
