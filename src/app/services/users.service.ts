import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserI } from '../models/user.interface';
import { Global } from './global.service';
import { Claims } from '../models/claims.model';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject: BehaviorSubject<Claims>;
  public user: Observable<Claims>;

  public url;
  constructor(private _http: HttpClient,private localStorage: LocalService) {
    this.userSubject = new BehaviorSubject<Claims>(JSON.parse(localStorage.getJsonValue('claims')));
    this.user = this.userSubject.asObservable();
    this.url = Global.url;
  }

  public get userValue(): Claims {

    return this.userSubject.value;

  }
  login(form: UserI) {
    return this._http.post<Claims>(this.url + 'auth/login', form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    }).pipe(map(Claims => {
      if (Claims && Claims.token) {
        this.localStorage.setJsonValue('claims', JSON.stringify(Claims));
        this.userSubject.next(Claims)
      }
      return Claims;
    }))

  }

  createNewUser(form: UserI) {
    return this._http.post(this.url + 'auth/register', form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getUsers(): Observable<any> {
    return this._http.get(this.url + 'auth/users', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getOneUser(id): Observable<any> {
    return this._http.get(this.url + 'auth/user/'+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  updateOneUser(form: UserI, id) {
    return this._http.put(this.url + 'auth/edit/' + id, form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  deleteOneUser(id) {
    return this._http.delete(this.url + 'auth/user/' + id, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        //'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  logOut(){
    localStorage.removeItem('rol')
    localStorage.removeItem('Token');
  }
  // deleteOneUser(id){
  //   return this._http.delete(this.url + 'user/' + id, {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json',
  //       //'x-access-token': '' + localStorage.getItem("Token")
  //     })
  //   })
  // }





}
