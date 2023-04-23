import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { Review } from 'src/app/models/Review';
import { ManagerServiceService } from 'src/app/services/manager-service.service';
import { DialogData } from '../manager.component';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent {
  // @Input() employees:Employee[] = []
  @Input() reviews:Review[] = []
  reviewColumns = ['name', 'deliverable', 'achievements', 'areaOfImprovement', 'score', 'feedback', 'action']

  constructor(private managerService:ManagerServiceService, public dialog: MatDialog) {
  }
  isNotEmpty() {
    if (this.reviews.length == 0) return false;
    return true
  }
  ngOnInit() {
  }
  log() {
  }
  openDialog(review:Review) {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      data: {
        review
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'feedback.component.html',
})
export class FeedbackDialog {
  review:Review
  tempFeedback:string = ""
  tempScore:number = 0
  errorMessage = ""
  constructor(public dialogRef: MatDialogRef<FeedbackDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private goalService:GoalsService) {
      this.review = data.review;
  }
  log() {
  }
  ngOnInit() {
    console.log(this.review);
  }
  closeDialog() {
    this.review.managerFeedback = "";
    this.review.score = 0;
    this.dialogRef.close()
  }
}