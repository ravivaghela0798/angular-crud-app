import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  custommers: Customer = new Customer();

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
  }

  redirectCustomerList() {
    this.router.navigate(['/customers']);
  }

  saveCustomer() {
    this.customerService.saveCustomer(this.custommers).subscribe(data => {
      console.log(this.custommers);
      this.redirectCustomerList();
    },
      error => console.log(error));
  }

  onSubmit(custommers) {
    console.log(custommers);
    this.saveCustomer();
  }


}
