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

    getExteriorRequest(value): Observable<any> {
      return this._http.get(this.url + 'exteriorRequest?value='+value, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

  

    getOneExteriorRequest(id,value): Observable<any> {
      return this._http.get(this.url + 'exteriorRequest/' + id+'?value='+value, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createNewExteriorRequest(form: ExteriorRequestI) {
      return this._http.post(this.url + 'exteriorRequest', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOneExteriorRequest(form: ExteriorRequestI, id) {
      return this._http.put(this.url + 'exteriorRequest/edit/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
