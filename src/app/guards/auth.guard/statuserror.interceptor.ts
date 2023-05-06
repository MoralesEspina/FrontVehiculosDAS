import { Injectable, Type } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';



@Injectable()
export class Statuserror implements HttpInterceptor {

  constructor(private authService: UsersService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(catchError(err=>{
            if ([401, 402].indexOf(err.status) !== -1){
                this.authService.logOut();
                location.reload();
            }

            const error = err.error.message || err.statusText;
            return throwError(error)
        }))
  }
}