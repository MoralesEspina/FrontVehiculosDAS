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

    getTrip(): Observable<any> {
      return this._http.get(this.url + 'trips/exteriorRequest', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}