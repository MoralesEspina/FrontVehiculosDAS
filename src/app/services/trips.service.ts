import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getTrips(option, request): Observable<any> {
      return this._http.get(`${this.url}trips?value=${option}&request=${request}`,
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateTrips(id,status:ResponseI){
      return this._http.put(`${this.url}trips/${id}`, status,
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOnePDF( id,option): Observable<any> {
      return this._http.get(`${this.url}trips/pdf/${id}?option=${option}`, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
