import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';

const route: Routes = [
  {path:"", component:AppComponent},
  {path:"login", component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ManagerComponent,
    AdminComponent,
    LeaveRequestsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
