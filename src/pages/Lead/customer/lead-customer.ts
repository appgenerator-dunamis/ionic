import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../../services/data/data';
import { UrlResolver } from '@angular/compiler';
import * as moment from 'moment';
import { SingletonService } from '../../../services/singleton/singleton';

@Component({
  selector: 'lead-customer',
  templateUrl: 'lead-customer.html',
})
export class LeadCustomerPage {
  mode;
  readOnly;
  customer;
  
  persons;
personId;

  getPersons(){
      this.dataProvider.getData("Person").subscribe(response => {
                  this.persons = response;
                  console.log(this.persons);
              }, error => {
                  console.log('error');
              });
  }

  onPersonChanged(){
      if(this.customer.person==null) this.customer.person = {};
      this.customer.person.id = this.personId;
      console.log(this.customer);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public dataProvider: DataProvider, public singleton: SingletonService) {
	  this.mode = navParams.get("mode");
	  this.readOnly = navParams.get("readOnly");
	  this.customer = navParams.get("customer");

	  if (this.customer.person!=null) this.personId = this.customer.person.id;
  }

  ionViewDidLoad() {
  	  this.getPersons();	
  }

  onStartTime() {  
  }

  closeModal() {
    this.viewCtrl.dismiss(this.customer);
  }

  save(){
    if(this.mode == "Add" ){
      console.log('Adding');

      this.dataProvider.postData("Customer",this.customer).subscribe(response => {
          console.log("Added");
      }, error => {
          console.log('error');
          console.log("Add Failed");
      });

      this.viewCtrl.dismiss(this.customer);
    }else{
      console.log('Updating');

      this.dataProvider.postData("Customer",this.customer).subscribe(response => {
          console.log("Updated");
      }, error => {
          console.log('error');
          console.log("Update Failed");
      });

      this.viewCtrl.dismiss(this.customer);
    }
  }

  
}