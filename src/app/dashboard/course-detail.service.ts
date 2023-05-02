import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailService {

  constructor() { }
  
  courseDetails = [
    {
      id:1,
      courseName:"Getting Started With Python",
      courseImg:"https://www.analyticsinsight.net/wp-content/uploads/2020/06/Python1.png"
    },
    {
      id:2,
      courseName:"Java",
      courseImg:"https://favtutor.com/resources/images/uploads/Java_Projects_for_Beginners.jpg"
    },
    {
      id:3,
      courseName:"C Programming",
      courseImg:"https://nareshit.com/wp-content/uploads/2018/08/C-Programming-online-training-nareshit.jpg"
    },
    {
      id:4,
      courseName:"HTML, CSS, JS",
      courseImg:"https://p92.com/binaries/content/gallery/p92website/technologies/htmlcssjs-overview.png"
    },
  ]
}
