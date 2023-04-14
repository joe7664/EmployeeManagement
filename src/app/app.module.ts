import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ManagerComponent as mComponent } from './components/manager/manager.component';
import { NavbarComponent } from './components/navbar/navbar.component';
const route: Routes = [
  {path:"", component:AppComponent},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeeComponent,
    ManagerComponent,
    AdminComponent,
    LeaveRequestsComponent,
    mComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(route),
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
