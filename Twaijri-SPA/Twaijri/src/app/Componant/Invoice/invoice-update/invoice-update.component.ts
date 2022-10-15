import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invoice } from 'src/app/Models/Invoice';
import { AlertifyService } from 'src/app/service/Alertify.service';
import { InvoiceService } from 'src/app/service/Invoice.service';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.css']
})
export class InvoiceUpdateComponent implements OnInit {
  @Input() Data:Invoice;
  UpdateForm: FormGroup;
  @Output() Ivoicecrate = new EventEmitter<boolean >();
  constructor(private Service:InvoiceService,private formBuilder: FormBuilder,private alertfy:AlertifyService) { }

  ngOnInit(): void {
    this.CreateUPdateForm();
    
  }

  CreateUPdateForm() {
    console.log(!!this.Data)
    if (!!this.Data) {
      console.log(this.Data.customerId);
      this.UpdateForm = this.formBuilder.group({
        CustomerId: [this.Data.customerId],
        Value: [this.Data.value],
        InvoiceId:[this.Data.invoiceId],
        State:[this.Data.state]
        // CustomerId:[this.Data.customerId]
      });
      this.UpdateForm.get('CustomerId')?.disable();  
      this.UpdateForm.get('InvoiceId')?.disable();  
    }
    
  }

  updateInvoice(id:any){
    this.Service.UpdateInvoice(id,this.UpdateForm.getRawValue()).subscribe({
      next:()=>{
        this.Ivoicecrate.emit(false);
        this.alertfy.success("Success","Congrations Updated")
      },
      error:(e)=>{
        this.alertfy.error("Error",e)
      }
    })
  }

}
