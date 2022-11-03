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
      return this._http.get(this.url + 'requestExterior', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneRequestExterior(id): Observable<any> {
      return this._http.get(this.url + 'requestExterior/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneRequestExteriorComplete(id): Observable<any> {
      return this._http.get(this.url + 'requestExterior/complete/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createNewRequestExterior(form: ExteriorRequestI) {
      return this._http.post(this.url + 'requestExterior', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneRequestExterior(form: ExteriorRequestI, id) {
      return this._http.put(this.url + 'requestExterior/edit/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
