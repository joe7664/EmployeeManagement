import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  id:number = 0

  constructor(private http:HttpClient) { 
    let sessionID = localStorage.getItem("employeeID")
    if (sessionID !== null && sessionID!=="null") this.id = sessionID as unknown as number;
  }
  login(employee:Employee) : Observable<Employee> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Employee>("http://localhost:9000/revWorkforce/login", 
    employee, {headers:header})
  }
  register(employee:Employee) : Observable<any> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://localhost:9000/revWorkforce/register", employee,{responseType:"text"})
  }
  
}
