import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Leave } from '../models/Leave';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  constructor(private http:HttpClient, private loginService:LoginService) { }
  getEmployees() : Observable<Employee[]>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Employee[]>("http://localhost:9000/revWorkforce/employee/manager/" + this.loginService.id , {headers:header})
  }
  getLeaveRequests() : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://localhost:9000/leaves/manager/" + this.loginService.id , {headers:header})
  }
}
