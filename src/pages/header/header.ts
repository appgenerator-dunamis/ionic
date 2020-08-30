import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationPage } from '../Notification/notification';

@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class HeaderPage {

  constructor(public navCtrl: NavController) {

  }

  //Navigating to Notification Page
  notification()
  {
    this.navCtrl.push(NotificationPage);
  }
}