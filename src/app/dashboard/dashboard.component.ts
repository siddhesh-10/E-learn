import { Component } from '@angular/core';
import { CourseDetailService } from './course-detail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private service:CourseDetailService) { }

  courseData:any;
  help:boolean=false;
  onHelp(){
    if(this.help==false){
      this.help=true;
    }
    else if(this.help==true){
      this.help=false;
    }
    
  }
  onClose(){
    this.help=false;
  }
  ngOnInit(): void {
    this.courseData = this.service.courseDetails;
  }

}
