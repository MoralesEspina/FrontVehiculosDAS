import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public url;
  constructor(private _http: HttpClient,) {
    this.url = Global.url;
  }

  login(form: UserI) {
    return this._http.post(this.url + 'auth/login', form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  createNewUser(form: UserI) {
    return this._http.post(this.url + 'auth/register', form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getUsers(): Observable<any> {
    return this._http.get(this.url + 'auth/users', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getOneUser(id): Observable<any> {
    return this._http.get(this.url + 'auth/user/'+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  updateOneUser(form: UserI, id) {
    return this._http.put(this.url + 'auth/edit/' + id, form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }
  // deleteOneUser(id){
  //   return this._http.delete(this.url + 'user/' + id, {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json',
  //       //'x-access-token': '' + localStorage.getItem("Token")
  //     })
  //   })
  // }





}
