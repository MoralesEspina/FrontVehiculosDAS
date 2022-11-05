import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalRequestI } from '../models/localRequest.interface';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestlocalService {


  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getRequestLocal(): Observable<any> {
      return this._http.get(this.url + 'requestLocal', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createOneRequestLocal(form: LocalRequestI) {
      return this._http.post(this.url + 'requestLocal', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneRequestLocal(id): Observable<any> {
      return this._http.get(this.url + 'requestLocal/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneRequestLocalComplete(id): Observable<any> {
      return this._http.get(this.url + 'requestLocal/complete/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneRequestLocal(form: LocalRequestI, id) {
      return this._http.put(this.url + 'requestLocal/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
