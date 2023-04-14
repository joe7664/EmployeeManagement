import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  id:number = 0

  constructor(private http:HttpClient) { }
  updateInfo(employee:Employee) : Observable<Employee> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Employee>("http://localhost:9000/revWorkforce/updateInfo", 
    employee, {headers:header})
  }
}
