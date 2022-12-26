import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers : Customer[];

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  private getAllCustomers(){
    this.customerService.getAllcustomers().subscribe(
      data => {
        this.customers = data;
      }
    );
  }
}
