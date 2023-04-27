import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  id:number = 0
  adminId = 0
  isManager:number = 0
  isAdmin: number = 0

  constructor(private http:HttpClient) { 
    let sessionID = localStorage.getItem("employeeID")
    let adminSession = localStorage.getItem("adminId")
    let isManager = localStorage.getItem("isManager")
    let isAdmin = localStorage.getItem("isAdmin")
    if (sessionID !== null && sessionID!=="0") this.id = sessionID as unknown as number;
    if (adminSession !== null && adminSession !=="0") this.adminId = adminSession as unknown as number;
    if (isManager !== "0" && isManager!==null) this.isManager = isManager as unknown as number;
    if (isAdmin !== "0" && isAdmin !== null) this.isAdmin = isAdmin as unknown as number;
  }
  login(employee:Employee) : Observable<Employee> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Employee>("http://54.215.229.217:9000/revWorkforce/login", 
    employee, {headers:header})
  }
  register(employee:Employee) : Observable<any> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/revWorkforce/register", employee,{responseType:"text"})
  }
  resetPassword(email:string) : Observable<any> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/revWorkforce/password-reset", {"email":email}, {responseType:"text"})

  }

  loginAdmin(admin: Admin): Observable<Admin>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Admin>("http://54.215.229.217:9000/admin/login", 
    admin, {headers:header})
  }
  
}
