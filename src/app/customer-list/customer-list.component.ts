import { Router } from '@angular/router';
import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomerService, private routes: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  redirectToCustomerList() {
    this.routes.navigate(['/customers']);
  }

  private getAllCustomers() {
    this.customerService.getAllcustomers().subscribe(
      data => {
        this.customers = data;
      });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(data => {
      console.log(data);
      this.redirectToCustomerList();
    })
  }
}
