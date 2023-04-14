import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { 
    this.header.append("accept", "text/json");
    this.header.append("Access-Control-Allow-Origin", "*")
  }
header: HttpHeaders = new HttpHeaders();
  retrieveInfo(id: number) : Observable<Employee>{
    return this.http.get("http://localhost:9000/revWorkforce/employee/"+id, 
        {headers: this.header})
  }
  updateInfo(employee:Employee) : Observable<Employee> {
    return this.http.patch<Employee>("http://localhost:9000/revWorkforce/employee/"+employee.id, 
    employee, {headers: this.header})
  }
}
