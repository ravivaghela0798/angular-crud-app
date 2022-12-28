import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs';
import ValidateForm from './validateForm';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {

  id: number;
  isCreate: any;
  formSubmitted: Boolean = false;
  customerForm: FormGroup;
  age;
  showAge;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.id = this.activeRoute.snapshot.params['id'];
    this.isCreate = !this.id;

    this.customerForm = this.formBuilder.group({
      id: [this.id],
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-z]{3,50}")]],
      lastName: ['', [Validators.required, Validators.pattern("[A-Za-z]{3,50}")]],
      dateOfBirth: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address1: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      address2: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.pattern("(1[0-9]|[2-9][0-9]|1[01][0-9]|120)")]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    })

    if (this.id) {
      this.getById();
    }
    this.ageCalculator();
  }

  private getById() {
    this.customerService.getById(this.id)
      .pipe(first())
      .subscribe(x => this.customerForm.patchValue(x));
  }

  private save() {
    this.customerService.save(this.customerForm.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/customers'], { relativeTo: this.activeRoute });
      }, error => console.log(error));
  }

  private update() {
    this.customerService.update(this.id, this.customerForm.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/customers'], { relativeTo: this.activeRoute });
      }, error => console.log(error));
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.customerForm.valid) {
      if (this.isCreate) {
        this.save();
      } else {
        this.update();
      }
    }
    else {
      ValidateForm.validateAllFields(this.customerForm);
    }
  }

  cancel() {
    this.router.navigateByUrl('/customers');
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  ageCalculator() {
    if (this.age) {
      console.log(this.age);
      console.log(this.customerForm.value.age);
      console.log(this.showAge);
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }
}
