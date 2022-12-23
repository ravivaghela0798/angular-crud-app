import { Customer } from './../customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers : Customer[];

  displayedColumns: string[] = ['name', 'dateOfBirth', 'mobile', 'address', 'gender', ];

  constructor () {
    this.customers = [
      {
        id : 1,
        firstName : "Ravi",
        lastName : "Vaghela",
        dateOfBirth : new Date(7/11/1999),
        mobile : 9601919359,
        address1 : "2, Indiranagar",
        address2 : "Kani, Patan, Gujarat, India.",
        age : 24,
        gender : "Male",
        email : "vaghelarv600@gmail.com"
      }
    ]
  }


  ngOnInit(): void {
  }

}
