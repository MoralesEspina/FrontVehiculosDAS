import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Global } from './global.service';
import { ExteriorRequestI } from '../models/exteriorRequest.interface';

@Injectable({
  providedIn: 'root'
})

export class ExteriorRequestService{
    public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getRequestExterior(): Observable<any> {
      return this._http.get(this.url + 'vehicles', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneRequestExterior(id): Observable<any> {
      return this._http.get(this.url + 'vehicles/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createNewRequestExterior(form: ExteriorRequestI) {
      return this._http.post(this.url + 'vehicles', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneRequestExterior(form: ExteriorRequestI, id) {
      return this._http.put(this.url + 'vehicles/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
