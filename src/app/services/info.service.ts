import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getTypes(): Observable<any> {
      return this._http.get(this.url + 'info/types', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getStatus(): Observable<any> {
      return this._http.get(this.url + 'info/status', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getDepartments(): Observable<any> {
      return this._http.get(this.url + 'departments', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOneDepartment(id): Observable<any> {
      return this._http.get(this.url + 'departments/'+id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
  }

