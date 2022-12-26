import { Customer } from './../model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + "/getCustomerById/" + id);
  }

  getAllcustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + "/getAllCustomers");
  }

  saveCustomer(customer: Customer): Observable<Object> {
    return this.http.post<Object>(this.baseUrl + "/saveCustomer", customer);
  }

  // updateCustomer(id: number, customer: Customer): Observable<Customer[]> {
  //   return this.http.put<Customer[]>(this.baseUrl + "/updateCustomer/" + id, customer);
  // }

  // deleteCustomer(id: number): Observable<Customer[]> {
  //   return this.http.delete<Customer[]>(this.baseUrl + "/deleteCustomer/" + id);
  // }
}
