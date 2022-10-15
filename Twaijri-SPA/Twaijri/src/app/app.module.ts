import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './Componant/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './Componant/MainComponant/nav/nav.component';
import { FooterComponent } from './Componant/MainComponant/footer/footer.component';
import { HomeComponent } from './Componant/MainComponant/home/home.component';
import { LoginComponent } from './Componant/AuthComponant/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './Componant/Customer/customer-list/customer-list.component';
import { CustomerUpdateComponent } from './Componant/Customer/customer-update/customer-update.component';
import { CustomerProfileComponent } from './Componant/Customer/customer-profile/customer-profile.component';
import { InvoiceListComponent } from './Componant/Invoice/invoice-list/invoice-list.component';
import { InvoiceUpdateComponent } from './Componant/Invoice/invoice-update/invoice-update.component';
import { InvoiceCreateComponent } from './Componant/Invoice/invoice-create/invoice-create.component';
import { HttpErrorInterceptor, HttpErrorInterceptorex } from './service/error.interceptor';
import { TokenInterceptorex } from './service/Token.interseptor';
import { AuthGuard } from './_gurd/auth.guard';
import { AlertifyService } from './service/Alertify.service';
import { CustomerService } from './service/Customer.service';
import { InvoiceService } from './service/Invoice.service';
@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerProfileComponent,
    InvoiceListComponent,
    InvoiceUpdateComponent,
    InvoiceCreateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    HttpErrorInterceptorex,
    TokenInterceptorex,
    AuthGuard,
    AlertifyService,
    CustomerService,
    InvoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
