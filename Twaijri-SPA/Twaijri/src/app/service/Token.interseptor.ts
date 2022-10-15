import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let Token = localStorage.getItem("token");
   let jwttoken = req.clone({
    setHeaders: { Authorization: `Bearer ${Token} `}
   })
   return next.handle(jwttoken);
  }
}

export const TokenInterceptorex={
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptor,
  multi:true
}