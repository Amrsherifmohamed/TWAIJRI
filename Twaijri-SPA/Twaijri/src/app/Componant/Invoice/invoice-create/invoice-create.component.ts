import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/service/Alertify.service';
import { InvoiceService } from 'src/app/service/Invoice.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {
  UpdateForm: FormGroup; 
  @Output() Ivoicecrate = new EventEmitter<boolean >();
  constructor(private Service:InvoiceService,private formBuilder: FormBuilder,private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.CreateUPdateForm();
  }
  CreateUPdateForm() {

      this.UpdateForm = this.formBuilder.group({
        CustomerId: ['',[Validators.required]],
        Value: ['',[Validators.required]],
        State:['',[Validators.required]],
        InvoiceDate:['',[Validators.required]]
        // CustomerId:[this.Data.customerId]
      });
    }
    CreateInvoice(){
      if (this.UpdateForm.valid) {
        let body = this.UpdateForm.getRawValue();
      this.Service.createInvoice(body).subscribe({
        next:()=>{
          this.Ivoicecrate.emit(false);
          this.alertify.success("Success","Congrations")
        },
        error:(e)=>{
          this.alertify.error("Error",e)
        }
      })
      }
    }

}
