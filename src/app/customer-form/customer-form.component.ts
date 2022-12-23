import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm : FormGroup;

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      mobile: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl(''),
    })
  }

  onSubmit() {
    console.log(this.customerForm.value);
  }

  updateProfile() {

  }
}
