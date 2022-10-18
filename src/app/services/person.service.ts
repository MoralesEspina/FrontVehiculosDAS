import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PersonI } from '../models/person.interface';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService{

  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getPerson(): Observable<any> {
      return this._http.get(this.url + 'person', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getOnePerson(id): Observable<any> {
      return this._http.get(this.url + 'person/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createNewPerson(form: PersonI) {
      return this._http.post(this.url + 'person', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateOnePerson(form: PersonI, id) {
      return this._http.put(this.url + 'person/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    deleteOnePerson(id){
      return this._http.delete(this.url + 'person/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          //'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}

