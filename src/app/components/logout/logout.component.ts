import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router:Router,
              private _sweetAlert:SweetAlertService) { }

  ngOnInit(): void {
    localStorage.removeItem('rol')
    localStorage.removeItem('Token');
    this._sweetAlert.logout('Adios!');
  }

}
