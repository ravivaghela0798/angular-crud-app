import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {

  custommers: Customer = new Customer();
  id: number;
  isCreate: Boolean;;

  customer: FormGroup;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.id = this.activeRoute.snapshot.params['id'];
    this.isCreate = !this.id;


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

    if (!this.isCreate) {
      this.getById();
    }

  }

  confirm(){

  }

  private getById() {
    this.customerService.getById(this.id)
      .pipe(first())
      .subscribe(x => this.customer.patchValue(x));
  }

  private save() {
    this.customerService.save(this.customer.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/customers'], { relativeTo: this.activeRoute });
      }, error => console.log(error));
  }

  private update() {
    this.customerService.update(this.id, this.customer.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/customers'], { relativeTo: this.activeRoute });
      }, error => console.log(error));
  }

  onSubmit() {
    if (this.isCreate) {
      this.save();
    } else {
      this.update();
    }
  }

  cancel() {
      this.router.navigateByUrl('/customers');
  }

}
