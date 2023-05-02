import { Component , OnInit } from '@angular/core';
import { CognitoService } from 'src/app/provider/cognito.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean;
  constructor(private cognitoService: CognitoService) {
    this.isLoggedIn=false;
    
  }

  ngOnInit(): void {
    this.cognitoService.isAuthenticated$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  
}
