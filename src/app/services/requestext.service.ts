import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestextService {
  public url;
  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getRequest(): Observable<any> {
      return this._http.get(this.url + 'vehicles', {
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




}
