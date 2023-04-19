import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
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
import { DialogContentExampleDialog } from './components/manager/employees/employees.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';

import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { ManagerComponent as mComponent } from './components/manager/manager.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DateFormatterPipe } from './pipe/date-formatter.pipe';
import { HolidayLeavesComponent } from './components/holiday-leaves/holiday-leaves.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LeaveAction } from './components/manager/leave/leave.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PerformanceReviewComponent } from './components/manager/performance-review/performance-review.component';
import { GoalsComponent } from './components/manager/goals/goals.component';
import { MeetingComponent } from './components/manager/meeting/meeting.component';
import { LeaveComponent } from './components/manager/leave/leave.component';
import { EmployeesComponent } from './components/manager/employees/employees.component';
const route: Routes = [
  {path:"", redirectTo: '/home', pathMatch:'full'},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent,
    children:[
      {path:"profile", component: ProfileComponent},
      {path:"requested", component: LeaveRequestsComponent},
      {path:"holiday-leaves", component: HolidayLeavesComponent},
      {path:"apply", component: LeaveApplyComponent}
    ]
  },
  {path:"**", component:HomeComponent}
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
    DateFormatterPipe,
    HolidayLeavesComponent,
    LeaveAction,
    PerformanceReviewComponent,
    GoalsComponent,
    MeetingComponent,
    LeaveComponent,
    EmployeesComponent,
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
MatDatepickerModule,
MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    TextFieldModule,
  ],
  providers: [MatDatepickerModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
