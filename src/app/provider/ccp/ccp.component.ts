import { Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import 'amazon-connect-streams';

@Component({
  selector: 'app-ccp',
  templateUrl: './ccp.component.html',
  styleUrls: ['./ccp.component.css']
})
export class CcpComponent implements OnInit {

  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  help: boolean = false;

  onHelp() {
    if (this.help == false) {
      this.help = true;
    }
    else if (this.help == true) {
      this.help = false;
    }

  }
  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
      .then((success: boolean) => {
        this.isAuthenticated = success;
        if (!this.isAuthenticated) {
          // this.router.navigate(['/provider/sign-in']);
        }
      });
    this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;

        const ui = document.getElementById('ccp');

        const ccpUrl = "https://sparthoughtscontactcenter.my.connect.aws/connect/ccp-v2";
        try {
          if (ui) {
            connect.core.initCCP(ui, {
              ccpUrl: ccpUrl, 
              loginPopup: true, 
              loginOptions: {
                
                autoClose: true, 
                height: 600, 
                width: 400, 
                top: 0,
                left: 0, 
              },
              
              softphone: {
                allowFramedSoftphone: true, 
              },
              pageOptions: {
                
                enableAudioDeviceSettings: true, 
                enablePhoneTypeSettings: true, 
              },
              ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
              ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
              ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
            });
            connect.getLog().warn("CDEBUG >> CCP initialized");
          }
        } catch (err) {
          console.error("error :" + err);
        }
      });
  }

  public signOut(): void {
    this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/provider/sign-in']);
      });
  }
}