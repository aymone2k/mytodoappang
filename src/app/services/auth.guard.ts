import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router){}

  canActivate():  Promise<boolean | UrlTree> {
    return new Promise((resolve, reject)=>{
      this.userService.isAuth$.subscribe(
        (bool: boolean) =>{
          const isAuth = bool;
          if(isAuth){
            resolve(isAuth);
          }else{
            this.router.navigate(['/home'])
            reject(isAuth);
          }
        } )
    });
  }

}
