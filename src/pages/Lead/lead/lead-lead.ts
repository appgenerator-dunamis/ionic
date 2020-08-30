import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../../services/data/data';
import { UrlResolver } from '@angular/compiler';
import * as moment from 'moment';
import { SingletonService } from '../../../services/singleton/singleton';

@Component({
  selector: 'lead-lead',
  templateUrl: 'lead-lead.html',
})
export class LeadLeadPage {
  mode;
  readOnly;
  lead;
  
  products;
productId;customers;
customerId;organizations;
organizationId;

  getProducts(){
      this.dataProvider.getData("Product").subscribe(response => {
                  this.products = response;
                  console.log(this.products);
              }, error => {
                  console.log('error');
              });
  }

  onProductChanged(){
      if(this.lead.product==null) this.lead.product = {};
      this.lead.product.id = this.productId;
      console.log(this.lead);
  }getCustomers(){
      this.dataProvider.getData("Customer").subscribe(response => {
                  this.customers = response;
                  console.log(this.customers);
              }, error => {
                  console.log('error');
              });
  }

  onCustomerChanged(){
      if(this.lead.customer==null) this.lead.customer = {};
      this.lead.customer.id = this.customerId;
      console.log(this.lead);
  }getOrganizations(){
      this.dataProvider.getData("Organization").subscribe(response => {
                  this.organizations = response;
                  console.log(this.organizations);
              }, error => {
                  console.log('error');
              });
  }

  onOrganizationChanged(){
      if(this.lead.organization==null) this.lead.organization = {};
      this.lead.organization.id = this.organizationId;
      console.log(this.lead);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public dataProvider: DataProvider, public singleton: SingletonService) {
	  this.mode = navParams.get("mode");
	  this.readOnly = navParams.get("readOnly");
	  this.lead = navParams.get("lead");

	  if (this.lead.product!=null) this.productId = this.lead.product.id;if (this.lead.customer!=null) this.customerId = this.lead.customer.id;if (this.lead.organization!=null) this.organizationId = this.lead.organization.id;
  }

  ionViewDidLoad() {
  	  this.getProducts();this.getCustomers();this.getOrganizations();	
  }

  onStartTime() {  
  }

  closeModal() {
    this.viewCtrl.dismiss(this.lead);
  }

  save(){
    if(this.mode == "Add" ){
      console.log('Adding');

      this.dataProvider.postData("Lead",this.lead).subscribe(response => {
          console.log("Added");
      }, error => {
          console.log('error');
          console.log("Add Failed");
      });

      this.viewCtrl.dismiss(this.lead);
    }else{
      console.log('Updating');

      this.dataProvider.postData("Lead",this.lead).subscribe(response => {
          console.log("Updated");
      }, error => {
          console.log('error');
          console.log("Update Failed");
      });

      this.viewCtrl.dismiss(this.lead);
    }
  }

  
}