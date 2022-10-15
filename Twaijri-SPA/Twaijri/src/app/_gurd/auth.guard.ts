import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../service/Alertify.service';
import { AuthService } from '../service/Auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authservice:AuthService,private router:Router,private alertify:AlertifyService) {}
  canActivate(next:ActivatedRouteSnapshot):boolean {
  if(this.authservice.loggedIn()){
      return true;
    }
    this.alertify.error('Error',"You Shoul Login first");
    this.router.navigate(['']);
    return false;
   
  }
}