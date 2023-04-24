import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalRequestI } from '../models/localRequest.interface';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LocalRequestService {
  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getLocalRequest(): Observable<any> {
      return this._http.get(this.url + 'localRequest', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getLocalRequestOnHold(): Observable<any> {
      return this._http.get(this.url + 'localRequest/onhold', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createOneLocalRequest(form: LocalRequestI) {
      return this._http.post(this.url + 'localRequest', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneLocalRequest(id): Observable<any> {
      return this._http.get(this.url + 'localRequest/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneLocalRequestComplete(id): Observable<any> {
      return this._http.get(this.url + 'localRequest/complete/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneLocalRequest(form: LocalRequestI, id) {
      return this._http.put(this.url + 'localRequest/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
