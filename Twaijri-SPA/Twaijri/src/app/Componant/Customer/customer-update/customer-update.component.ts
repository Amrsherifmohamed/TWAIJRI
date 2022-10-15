import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Customer } from 'src/app/Models/Customer';
import { CustomerService } from 'src/app/service/Customer.service';
import {  takeUntil,debounceTime } from 'rxjs/operators';
import { AlertifyService } from 'src/app/service/Alertify.service';
@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  @Input() Data:Customer;
  UpdateForm: FormGroup;
  @Output() Ivoicecrate = new EventEmitter<boolean >();
  constructor(private CustomerService:CustomerService,private formBuilder: FormBuilder,private alertfiy:AlertifyService) { }

  ngOnInit(): void {
    this.CreateUPdateForm();
    // this.addValue();
  }
  CreateUPdateForm() {
    console.log(!!this.Data)
    if (!!this.Data) {
      console.log(this.Data.customerName);
      this.UpdateForm = this.formBuilder.group({
        CustomerName: [this.Data.customerName],
        PhoneNumber: [this.Data.phoneNumber],
        CustomerId:[this.Data.customerId]
        // CustomerId:[this.Data.customerId]
      })  
    }
    
  }

  updateUser(id:any){
    this.CustomerService.UpdateCustomer(id,this.UpdateForm.getRawValue()).subscribe({
      next:()=>{
        this.Ivoicecrate.emit(false);
        this.alertfiy.success("Update Success","Congrations");
      },
      error:(e)=>{
        this.alertfiy.error("Error",e)
      }
    })
  }

}
