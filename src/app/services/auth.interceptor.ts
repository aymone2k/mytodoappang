import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public userService: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.token}`
      }
    });
    return next.handle(request);
  }
}
