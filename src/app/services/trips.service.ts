import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getTripsExterior(): Observable<any> {
      return this._http.get(this.url + 'trips/exteriorRequest', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getTripsExteriorOnHold(): Observable<any> {
      return this._http.get(this.url + 'trips/exteriorRequest/onhold', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getTripsLocal(): Observable<any> {
      return this._http.get(this.url + 'trips/localRequest', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getTripsLocalOnHold(): Observable<any> {
      return this._http.get(this.url + 'trips/localRequest/onhold', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
