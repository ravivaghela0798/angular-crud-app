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

  id: number;
  isCreate: Boolean;;
  submitted = false;
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
      id: [this.id, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dateOfBirth: ['', Validators.required],
      mobile: ['', [Validators.minLength(5), Validators.maxLength(17), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address1: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      address2: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      age: ['', [Validators.minLength(10), Validators.maxLength(120)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    })

    if (!this.isCreate) {
      this.getById();
    }
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
    this.submitted = true;
    if (this.customer.invalid) {
      return
    }
    else {
      if (this.isCreate) {
        this.save();
        console.log(this.customer);
      } else {
        this.update();
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/customers');
  }

}
