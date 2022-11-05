import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getOneVoucherDiesel(id): Observable<any> {
      return this._http.get(this.url + 'voucher/diesel/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneVoucherRegular(id): Observable<any> {
      return this._http.get(this.url + 'voucher/regular/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
