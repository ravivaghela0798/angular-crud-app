import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import ValidateForm from './validateForm';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {

  id: number;
  isCreate: Boolean;
  submitted = false;
  customerForm: FormGroup;
  public minDate = new Date();
  public maxDate = new Date(new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 14));


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
      id: [this.id, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
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
    this.submitted = true;
    if (this.customerForm.valid) {
      if (this.isCreate) {
        this.save();
        console.log(this.customerForm);
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
}
