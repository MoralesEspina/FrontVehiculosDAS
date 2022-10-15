import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { localtrasportationI } from '../models/local_trasportation.interface';
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

    getrequestLocal(): Observable<any> {
      return this._http.get(this.url + 'requestLocal', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createonrequestLocal(form: localtrasportationI) {
      return this._http.post(this.url + 'requestLocal', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOnerequestLocal(id): Observable<any> {
      return this._http.get(this.url + 'requestLocal/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOnerequestLocal(form: localtrasportationI, id) {
      return this._http.put(this.url + 'requestLocal/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    deleteOnerequestLocal(id){
      return this._http.delete(this.url + 'requestLocal/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
