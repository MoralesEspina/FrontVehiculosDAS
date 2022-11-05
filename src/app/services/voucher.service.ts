import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoucherDieselI, VoucherGasolineI} from '../models/voucher.interface';
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
  getVoucherDiesel(): Observable<any> {
    return this._http.get(this.url + 'voucher/diesel', {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'Authorization:': 'Bearer' + localStorage.getItem("Token")
      })
    })
  }

  getOneVoucherDiesel(id): Observable<any> {
    return this._http.get(this.url + 'voucher/diesel/' + id, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  createNewVoucherDisel(form: VoucherDieselI) {
    return this._http.post(this.url + 'voucher/diesel', form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getVoucherRegular(): Observable<any> {
    return this._http.get(this.url + 'voucher/regular', {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'Authorization:': 'Bearer' + localStorage.getItem("Token")
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

  createNewVoucherRegular(form: VoucherGasolineI) {
    return this._http.post(this.url + 'voucher/regular', form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

}
