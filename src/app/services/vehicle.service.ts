import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VehicleI } from '../models/vehicle.interface';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getVehicles(): Observable<any> {
      return this._http.get(this.url + 'vehicles', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createonVehicle(form: VehicleI) {
      return this._http.post(this.url + 'vehicles', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneVehicle(id): Observable<any> {
      return this._http.get(this.url + 'vehicles/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneVehicle(form: VehicleI, id) {
      return this._http.put(this.url + 'vehicles/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    deleteOneVehicle(id){
      return this._http.delete(this.url + 'vehicles/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
