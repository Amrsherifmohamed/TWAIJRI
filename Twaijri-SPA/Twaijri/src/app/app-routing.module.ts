import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './Componant/Customer/customer-list/customer-list.component';
import { CustomerProfileComponent } from './Componant/Customer/customer-profile/customer-profile.component';
import { InvoiceListComponent } from './Componant/Invoice/invoice-list/invoice-list.component';
import { HomeComponent } from './Componant/MainComponant/home/home.component';
import { AuthGuard } from './_gurd/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component:HomeComponent
  },
  {
    path: 'Customer', 
    component:CustomerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Invoice', 
    component:InvoiceListComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'Profile/:customerId', 
  //   component:CustomerProfileComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
