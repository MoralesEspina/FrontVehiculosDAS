import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseI } from 'src/app/models/response.interface';
import { UserI } from 'src/app/models/user.interface';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user;
  public token:any;
  public verifyToken;
  public rol:any;
  public data_response;
  constructor(private _loginService:UsersService,
              private _sweetAlert:SweetAlertService,
              private _router:Router) {
    this.user = new UserI ('','','','')
    this.data_response = new ResponseI('', '')
   }

  ngOnInit(): void {
    this.verifyToken = localStorage.getItem('Token')
    if (this.verifyToken) {
      this._router.navigate(['dashboard'])
    }
  }

  login(loginForm) {
    if (loginForm.valid) {
      this._loginService.login(this.user).subscribe(
        response => {
          this.data_response = response;
          this.token = this.data_response.token;
          this.rol = this.data_response.data.data.rol;
          localStorage.setItem('rol', this.rol)
          localStorage.setItem('Token', this.token);
          localStorage.setItem('User', this.user.username);
          this._sweetAlert.login('Inicio de Sesión Exitoso');
            },
            error => {
              this._sweetAlert.error('Parece que algo salio mal');
            })
    } else {

    }
  }
}
