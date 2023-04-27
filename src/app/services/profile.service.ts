import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient, private emp:LoginService) { 
    this.header.append("accept", "text/json");
    this.header.append("Access-Control-Allow-Origin", "*")
  }
header: HttpHeaders = new HttpHeaders();
  retrieveInfo() : Observable<Employee>{
    return this.http.get("http://54.215.229.217:9000/revWorkforce/employee/"+this.emp.id, 
        {headers: this.header})
  }
  updateInfo(employee:Employee) : Observable<Employee> {
    return this.http.patch<Employee>("http://54.215.229.217:9000/revWorkforce/employee/"+employee.id, 
    employee, {headers: this.header})
  }
}
