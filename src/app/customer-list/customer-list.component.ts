import { first } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {

  public popoverTitle: string = 'Delete Customer';
  public popoverMessage: string = 'You want delete this customer ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  customers: Customer[];
  customerLength : number;

  constructor(
    private customerService: CustomerService,
    private routes: Router,
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  private getAllCustomers() {
    this.customerService.getAll().subscribe((data) => {
      this.customers = data;
      this.customerLength = data.length;
    });
  }

  deleteCustomer(id: number) {
    this.customerService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.getAllCustomers();
        // window.location.reload()
        // // this.routes.navigate(['/customers']);
      }, error => console.log(error));
  }
}

