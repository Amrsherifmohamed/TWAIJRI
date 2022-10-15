import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
  import { AlertifyService } from './Alertify.service';
   
   export class HttpErrorInterceptor implements HttpInterceptor {
    private alertiry:AlertifyService
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              this.alertiry.error("Error",error.error.message)
              // errorMessage = Error: ${error.error.message};
            } else {
              // server-side error
              this.alertiry.error(`Error${error.status}`,error.message)
              // errorMessage = Error.Code: ${error.status}\nMessage: ${error.message};
            }
            this.alertiry.error("Error",errorMessage);
            return throwError(errorMessage);
          })
        )
    }
   }

   export const HttpErrorInterceptorex={
    provide:HTTP_INTERCEPTORS,
    useClass:HttpErrorInterceptor,
    multi:true
  }