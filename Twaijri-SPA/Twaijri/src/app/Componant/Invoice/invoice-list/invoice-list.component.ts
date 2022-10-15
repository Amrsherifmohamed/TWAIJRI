import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AlertifyService } from 'src/app/service/Alertify.service';
import { InvoiceService } from 'src/app/service/Invoice.service';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';
import { InvoiceUpdateComponent } from '../invoice-update/invoice-update.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  formInvoice!: FormGroup;
  Invoice:any[];
  totalInvoice:number=0;
  ngUnsubscribe = new Subject<void>();
  constructor(private _formBuilderInvoice: UntypedFormBuilder,private IvcoiveService:InvoiceService,public modalService: NgbModal,private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.loadData();
  }

  private initSearchForm(): void {
  
    this.formInvoice = this._formBuilderInvoice.group({
      // Pagination
      pageNumber: new FormControl(1),
      pageSize: new FormControl(8),
    });
    this.formInvoice.valueChanges
    .pipe(debounceTime(500))
    .subscribe(res => {
      this.formInvoice?.controls['pageNumber'].patchValue(1, { emitEvent: false });
       this.loadData();
    });
    }

    pageChange(pageNumber: number) {
      this.formInvoice.controls['pageNumber'].patchValue(pageNumber, { emitEvent: false });
       this.loadData();
    }

    loadData() {
      let filterInvoice=this.formInvoice.getRawValue();
        this.IvcoiveService.GetAllInvoice(filterInvoice,true).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
          this.Invoice = res.data;
          this.totalInvoice = res.total;
          console.log(this.Invoice);
        });
    }

    DeleteInvoice(id:any){
      this.IvcoiveService.DeleteInvoice(id).subscribe(
        {
          next:()=>{
            this.alertify.success("Delted","Deleteed Sucess")
            this.loadData();
            
          },
          error:(e)=>{
            this.alertify.error("Error","oops, Remove Error")
          }
        }
      )
    }
    openmodel2(){
      const modalRef = this.modalService.open(InvoiceCreateComponent)
      console.log(modalRef.componentInstance.Ivoicecrate );
      modalRef.result.then((result) => {

      }).catch((error) => {
        if (!modalRef.componentInstance.Ivoicecrate.closed) {
          this.loadData();
        }
      });
    }

    openModal(id:any) {
      //ModalComponent is component name where modal is declare
      console.log(id)
     this.IvcoiveService.getOneInvoice(id)
      .subscribe( {
        next:(result:any)=>{
          console.log(result);
          if (result !== null) {
            const modalRef = this.modalService.open(InvoiceUpdateComponent)
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
