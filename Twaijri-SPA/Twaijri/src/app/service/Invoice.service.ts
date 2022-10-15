import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from '../Models/Customer';
import { NgxSpinnerService } from "ngx-spinner";
import { IQueryParamater } from '../Models/IQueryParamater';
import { Invoice } from '../Models/Invoice';
@Injectable({
    providedIn: 'root'
  })
  export class InvoiceService {
    baseUrl = environment.ApiUrl+'api/Invoice/';
    /**
     *
     */
    constructor(private http: HttpClient,private spinner: NgxSpinnerService) {

    }

     // GET request
 GetAllInvoice(queryParameters?: object, showSpinner: boolean = true): Observable<any> {
    if (showSpinner) this.spinner.show();
    const httpParams: HttpParams = this.parameterizedUrl(queryParameters);
    return this.http.get<any>(this.baseUrl, { observe: 'response', params: httpParams })
      .pipe(
        map(res => res.body),
        tap(res => this.spinner.hide())
      );
  }

  getOneInvoice(id:any){
    return this.http.get<any>(this.baseUrl+"GetOneInvoice/"+id);
  }
  UpdateInvoice(Id:any,Invoice:Invoice){
    return this.http.put(this.baseUrl+Id,Invoice);
  }

  DeleteInvoice(id:any,showSpinner: boolean = true){
    // if (showSpinner) this.spinner.show();
    return this.http.delete(this.baseUrl+ id);
  }

  createInvoice(body:any){
    return this.http.post(this.baseUrl,body);
  }

  private parameterizedUrl(queryParameters?: object): HttpParams {
    if (!queryParameters) return new HttpParams();

    let httpParams: HttpParams = new HttpParams();

    let keyValues: IQueryParamater[] = Object.keys(queryParameters)
      .map(key => {
        return {
          key: key,
          value: queryParameters[key as keyof object]
        }
      })
      .filter(x => x.value != null);
    console.log("keyValues", keyValues);

    keyValues.forEach(keyValue => {

      if (Array.isArray(keyValue.value)) { // In-case you pass array

        // ...?Frequencies=1&Frequencies=2&Frequencies=3
        keyValue.value.forEach(x => httpParams = httpParams.append(keyValue.key, x));

      } else if (Object.prototype.toString.call(keyValue.value) === '[object Date]') {

        httpParams = httpParams.append(keyValue.key, new Date(keyValue.value).toISOString());

      } else if (typeof keyValue.value === 'object') {

        Object.keys(keyValue.value).forEach(x => httpParams = httpParams.append(x, keyValue.value[x]));

      } else {

        httpParams = httpParams.append(keyValue.key, keyValue.value);

      }

    });

    return httpParams;
  }
}