import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
//   id:number = 0

  constructor(private http:HttpClient) { 
    this.header.append("accept", "text/json");
    this.header.append("Access-Control-Allow-Origin", "*")
  }
header: HttpHeaders = new HttpHeaders();
  retrieveInfo() : Observable<Employee>{
    return this.http.get("http://localhost:9000/revWorkforce/getInfo", 
        {headers: this.header})
  }
  updateInfo(employee:Employee) : Observable<Employee> {
    return this.http.post<Employee>("http://localhost:9000/revWorkforce/updateInfo", 
    employee, {headers: this.header})
  }
}
