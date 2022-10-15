import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/Auth.service';
import { AlertifyService } from 'src/app/service/Alertify.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(public modalService: NgbActiveModal,
    private formBuilder: FormBuilder,private Authservice:AuthService,private router: Router,private Alertify:AlertifyService) { }

    ngOnInit() {
      this.initForm();
    }
  
    initForm() {
      this.CreateLoginForm();
      this.CreateRegisterForm();
    }
  
    // create Login Form
    CreateLoginForm() {
      this.loginForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        CustomerName: ['', [Validators.required]]
      })
    }
    // Create Register Form
  
    CreateRegisterForm() {
      this.registerForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.min(6)]],
        CustomerName: ['', Validators.required],
        PhoneNumber: ['', Validators.required]
      })
    }

    Login(){
      console.log(this.loginForm.valid);
      if(this.loginForm.valid){
        console.log("valid")
        let body = this.loginForm.getRawValue();
        this.Authservice.login(body).subscribe(
          {next :()=>{
            console.log("LOgin");
            this.router.navigate(['/Customer']);
          },
          error:(e)=>{
            this.Alertify.error("Error",e)
          }}
        );
      }
    }

    Register(){
      if (this.registerForm.valid) {
        let body = this.registerForm.getRawValue();
        this.Authservice.register(body).subscribe(
         {
          next:()=>{
           this.Alertify.success("Success","Welcome Enjoy")
            
          },
          error:(e)=>{
            this.Alertify.error("Error",e)
          }
          }
        )
      }
    }
    closeModal() {
      this.modalService.close('Modal Closed');
    }
}
