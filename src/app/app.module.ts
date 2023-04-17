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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatList, MatListModule} from '@angular/material/list'
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { DialogContentExampleDialog } from './components/manager/manager.component';


import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { ManagerComponent as mComponent } from './components/manager/manager.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HolidayLeavesComponent } from './components/holiday-leaves/holiday-leaves.component';
const route: Routes = [
  {path:"", component:AppComponent},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent,
    children:[
      {path:"profile", component: ProfileComponent},
      {path:"requested", component: LeaveRequestsComponent},
      {path:"holiday-leaves", component: HolidayLeavesComponent},
      {path:"apply", component: LeaveApplyComponent}
    ]
  },
  {path:"**", component:AppComponent}
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
    LeaveApplyComponent,
    ProfileComponent,
    mComponent,
    NavbarComponent,
    DialogContentExampleDialog,
    HolidayLeavesComponent
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
    MatTabsModule,
    MatTableModule,

    MatListModule,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
