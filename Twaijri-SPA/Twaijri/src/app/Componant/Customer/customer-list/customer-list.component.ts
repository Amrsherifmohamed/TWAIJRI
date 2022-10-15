import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import {  takeUntil,debounceTime, tap } from 'rxjs/operators';
import { CustomerService } from 'src/app/service/Customer.service';
import { Subject } from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';
import { AlertifyService } from 'src/app/service/Alertify.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  formCustomer!: FormGroup;
  Customer:any[];
  totalCustomer:number=0;
  ngUnsubscribe = new Subject<void>();
  constructor(private _formBuilderCustomer: UntypedFormBuilder,private CustomerService:CustomerService,public modalService: NgbModal,private alertfiy:AlertifyService) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.loadData();
  }

  private initSearchForm(): void {
  
    this.formCustomer = this._formBuilderCustomer.group({
      // Pagination
      pageNumber: new FormControl(1),
      pageSize: new FormControl(8),
    });
    this.formCustomer.valueChanges
    .pipe(debounceTime(500))
    .subscribe(res => {
      this.formCustomer?.controls['pageNumber'].patchValue(1, { emitEvent: false });
       this.loadData();
    });
    }

    pageChange(pageNumber: number) {
      this.formCustomer.controls['pageNumber'].patchValue(pageNumber, { emitEvent: false });
       this.loadData();
    }

    loadData() {
      let filterCustomer=this.formCustomer.getRawValue();
        this.CustomerService.GetAllCustoemr(filterCustomer,true).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
          this.Customer = res.data;
          this.totalCustomer = res.total;
        });
    }

    DeleteCustomer(id:any){
      this.CustomerService.DeleteCustomer(id).subscribe(
        {
          next:()=>{
            this.alertfiy.success("Update Sucess","Congrations");
            this.loadData();
          },
          error:(e)=>{
            this.alertfiy.error("Error",e)
          }
        }
      )
    }

     openModal(id:any) {
      //ModalComponent is component name where modal is declare
      
     this.CustomerService.getOneCustomer(id)
      .subscribe( {
        next:(result:any)=>{
          if (result != null) {
            const modalRef = this.modalService.open(CustomerUpdateComponent)
            modalRef.componentInstance.Data =  result;
            modalRef.result.then((result) => {
              console.log(result);
            }).catch((error) => {
              if (!modalRef.componentInstance.Ivoicecrate.closed) {
                this.loadData();
              }
            });
          }
        },
        error:()=>{
          console.log("Error");
        }
       });
      // modalRef.componentInstance.Data=this.CustomerService.getOneCustomer(id);     
    }
    isExpanded = false;
  
    collapse() {
      this.isExpanded = false;
    }
  
    toggle() {
      this.isExpanded = !this.isExpanded;
    }

}
