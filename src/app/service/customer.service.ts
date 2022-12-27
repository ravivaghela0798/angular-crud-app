import { Customer } from './../model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = "http://localhost:8080/customer";

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getById/${id}`);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/getAll`);
  }

  save(customer: Customer): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/save`, customer);
  }

  update(id: number, customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(`${this.baseUrl}/update/${id}`, customer);
  }

  delete(id: number): Observable<String> {
    return this.http.delete<String>(`${this.baseUrl}/delete/${id}`);
  }
}
