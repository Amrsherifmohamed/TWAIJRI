import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
   id:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params['customerId'];
    console.log(this.id);
  }

}
