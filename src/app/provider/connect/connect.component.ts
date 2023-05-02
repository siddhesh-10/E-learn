import { Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import 'amazon-connect-streams';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

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
          this.router.navigate(['/provider/sign-in']);
        }
      });
    this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
      });
    const ui = document.getElementById('ccp');
    // if (ui) {
    //   connect.core.initCCP(ui, {
    //     ccpUrl: 'https://sparthoughtscontactcenter.my.connect.aws/connect/ccp-v2',
    //     region: 'ca-central-1',
    //     loginPopup: true,
    //     loginPopupAutoClose: true,
    //     softphone: {
    //       allowFramedSoftphone: true
    //     },
    //     pageOptions: {
    //       enableAudioDeviceSettings: true,
    //       enablePhoneTypeSettings: true
    //     }
    //   })
    // }
    const ccpUrl = "https://sparthoughtscontactcenter.my.connect.aws/connect/ccp-v2"+ "&output=embed";
    try {
      if (ui) {
        connect.core.initCCP(ui, {
          ccpUrl: ccpUrl, // REQUIRED
          loginPopup: true, // optional, defaults to true
          loginOptions: {
            // optional, if provided opens login in new window
            autoClose: true, // optional, defaults to false
            height: 600, // optional, defaults to 578
            width: 400, // optional, defaults to 433
            top: 0, // optional, defaults to 0
            left: 0, // optional, defaults to 0
          },
          // region: connectRegion, // REQUIRED for `CHAT`, optional otherwise
          softphone: {
            // optional, defaults below apply if not provided
            allowFramedSoftphone: true, // optional, defaults to false
            disableRingtone: false, // optional, defaults to false
            ringtoneUrl: "./ringtone.mp3", // optional, defaults to CCP’s default ringtone if a falsy value is set
          },
          pageOptions: {
            // optional
            enableAudioDeviceSettings: true, // optional, defaults to 'false'
            enablePhoneTypeSettings: true, // optional, defaults to 'true'
          },
          ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
          ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
          ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
        });
        connect.getLog().warn("CDEBUG >> CCP initialized");
      }
    } catch (err) {
      console.error("error :"+err);
    }
  }

  public signOut(): void {
    this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/provider/sign-in']);
      });
  }
}