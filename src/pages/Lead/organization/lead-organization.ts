import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../../services/data/data';
import { UrlResolver } from '@angular/compiler';
import * as moment from 'moment';
import { SingletonService } from '../../../services/singleton/singleton';

@Component({
  selector: 'lead-organization',
  templateUrl: 'lead-organization.html',
})
export class LeadOrganizationPage {
  mode;
  readOnly;
  organization;
  
  

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public dataProvider: DataProvider, public singleton: SingletonService) {
	  this.mode = navParams.get("mode");
	  this.readOnly = navParams.get("readOnly");
	  this.organization = navParams.get("organization");

	  
  }

  ionViewDidLoad() {
  	  	
  }

  onStartTime() {  
  }

  closeModal() {
    this.viewCtrl.dismiss(this.organization);
  }

  save(){
    if(this.mode == "Add" ){
      console.log('Adding');

      this.dataProvider.postData("Organization",this.organization).subscribe(response => {
          console.log("Added");
      }, error => {
          console.log('error');
          console.log("Add Failed");
      });

      this.viewCtrl.dismiss(this.organization);
    }else{
      console.log('Updating');

      this.dataProvider.postData("Organization",this.organization).subscribe(response => {
          console.log("Updated");
      }, error => {
          console.log('error');
          console.log("Update Failed");
      });

      this.viewCtrl.dismiss(this.organization);
    }
  }

  
}