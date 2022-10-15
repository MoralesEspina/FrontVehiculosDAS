import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Global } from './global.service';
import { outsidevehiclemanT } from '../models/outsidevehicleman.interface';

@Injectable({
  providedIn: 'root'
})

export class outsidevehicleService{
    public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getoutsidevehiclemant(): Observable<any> {
      return this._http.get(this.url + 'vehicles', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneoutsidevehiclemant(id): Observable<any> {
      return this._http.get(this.url + 'vehicles/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createNewoutsidevehiclemant(form: outsidevehiclemanT) {
      return this._http.post(this.url + 'vehicles', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneoutsidevehiclemant(form: outsidevehiclemanT, id) {
      return this._http.put(this.url + 'vehicles/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    deleteOneoutsidevehiclemant(id){
      return this._http.delete(this.url + 'vehicles/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}