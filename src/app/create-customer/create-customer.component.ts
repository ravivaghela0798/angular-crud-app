import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NumberValueAccessor, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {

  custommers: Customer = new Customer();
  id: number;
  isEdit: Boolean;;

  customer: FormGroup;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isEdit = !this.id;


    this.customer = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      mobile: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })

    if (!this.isEdit) {
      this.getCustomerById();
    }

  }

  private getCustomerById() {
    this.customerService.getCustomerById(this.id)
      .pipe(first())
      .subscribe(x => this.customer.patchValue(x));
    // this.customerService.getCustomerById(this.id).subscribe(
    //   data => {
    //     this.customer = new FormGroup({
    //       firstName: new FormControl(data['firstName']),
    //       lastName: new FormControl(data['lastName']),
    //       dateOfBirth: new FormControl(data['dateOfBirth']),
    //       mobile: new FormControl(data['mobile']),
    //       address1: new FormControl(data['address1']),
    //       address2: new FormControl(data['address2']),
    //       age: new FormControl(data['age']),
    //       gender: new FormControl(data['gender']),
    //       email: new FormControl(data['email']),
    //     })
    //   });
  }
  // private redirectCustomerList() {
  //   this.router.navigate(['/customers']);
  // }

  private saveCustomer() {
    this.customerService.saveCustomer(this.customer.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/customers'], { relativeTo: this.route });
      }, error => console.log(error));
    // this.customerService.saveCustomer(this.customer.value).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.redirectCustomerList();
    //   },
    //   (error) => console.log(error)
    // );
  }

  private updateCustomer() {
    this.customerService.updateCustomer(this.id, this.customer.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/customers'], { relativeTo: this.route });
      }, error => console.log(error));
    // this.customerService.updateCustomer(this.id, this.customer.value).subscribe(data => {
    //   console.log(data, "Data Updated Successfully");
    // })
  }

  onSubmit() {
    if (this.isEdit) {
      this.saveCustomer();
    } else {
      this.updateCustomer();
    }
  }


}
