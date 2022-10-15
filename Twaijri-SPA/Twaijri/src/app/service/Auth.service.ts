import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../Models/Customer';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    baseUrl = environment.ApiUrl+'api/Auth/';
    jwtHelper = new JwtHelperService();
    currentUser:Customer;
    /**
     *
     */
    constructor(private http: HttpClient) {

    }

    login(model: any) {
        return this.http.post(this.baseUrl + 'Login', model).pipe(
          map((response: any) => {
            const user = response;
            if (user) { 
              localStorage.setItem('token', user.token);
              localStorage.setItem('user',JSON.stringify(user.user))
        //   this.decodedToken=this.jwtHelper.decodeToken(user.token);
        //   this.currentUser = user.user;
          }
          }))
      }

      register(customer: Customer) {
        return this.http.post(this.baseUrl + 'register', customer);
      }

      loggedIn() {
        try{const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token!);}
        catch{
          return false
        }
    }
  }