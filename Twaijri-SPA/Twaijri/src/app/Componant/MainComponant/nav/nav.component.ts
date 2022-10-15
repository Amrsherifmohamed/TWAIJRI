import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/Auth.service';
import { LoginComponent } from '../../AuthComponant/login/login.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modalService: NgbModal,public auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  openModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  LogOut(){
    localStorage.removeItem("token");
    this.router.navigate(['']);

  }
}
