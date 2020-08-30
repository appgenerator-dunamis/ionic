import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../services/data/data';
import { NotificationPage } from '../../pages/Notification/notification';

import { ModalController } from 'ionic-angular';

import { LeadProductPage } from '../Lead/Product/lead-product';import { LeadLeadPage } from '../Lead/Lead/lead-lead';import { LeadCustomerPage } from '../Lead/Customer/lead-customer';import { LeadOrganizationPage } from '../Lead/Organization/lead-organization';	

@Component({
	selector: 'lead',
	templateUrl: 'lead.html',
})

export class LeadPage {
	leadTabs;
	products;
product;
productPage =0 ;leads;
lead;
leadPage =0 ;customers;
customer;
customerPage =0 ;organizations;
organization;
organizationPage =0 ;
	

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController,
        public dataProvider: DataProvider) {}

	ionViewDidLoad() {
	}

	notification() {
		this.navCtrl.push(NotificationPage);
	}

	onSegmentChanged() {
		console.log('onSegmentChanged');
		switch (this.leadTabs) {
		    case "Product" :		
			this.product = 0;
			this.getProducts();		
		break;case "Lead" :		
			this.lead = 0;
			this.getLeads();		
		break;case "Customer" :		
			this.customer = 0;
			this.getCustomers();		
		break;case "Organization" :		
			this.organization = 0;
			this.getOrganizations();		
		break;
		    default:
		        break;
          }                           
        }
 getProducts(){
            if(this.productPage == 0) this.products = [];
            this.dataProvider.getData("Product/Page/" + this.productPage).subscribe(response => {
                        var jsonString = JSON.stringify(response);
    					var jsonData = JSON.parse(jsonString);
    					console.log(jsonData);
                        this.products = this.products.concat(jsonData.content);
                    }, error => {
                        console.log('error');
                    });
        }

        doInfiniteProduct(infiniteScroll) {
        this.productPage = this.productPage + 1;
        		
        		this.getProducts();
                setTimeout(() => {
		            infiniteScroll.complete();
		        }, 700);
        }getLeads(){
            if(this.leadPage == 0) this.leads = [];
            this.dataProvider.getData("Lead/Page/" + this.leadPage).subscribe(response => {
                        var jsonString = JSON.stringify(response);
    					var jsonData = JSON.parse(jsonString);
    					console.log(jsonData);
                        this.leads = this.leads.concat(jsonData.content);
                    }, error => {
                        console.log('error');
                    });
        }

        doInfiniteLead(infiniteScroll) {
        this.leadPage = this.leadPage + 1;
        		
        		this.getLeads();
                setTimeout(() => {
		            infiniteScroll.complete();
		        }, 700);
        }getCustomers(){
            if(this.customerPage == 0) this.customers = [];
            this.dataProvider.getData("Customer/Page/" + this.customerPage).subscribe(response => {
                        var jsonString = JSON.stringify(response);
    					var jsonData = JSON.parse(jsonString);
    					console.log(jsonData);
                        this.customers = this.customers.concat(jsonData.content);
                    }, error => {
                        console.log('error');
                    });
        }

        doInfiniteCustomer(infiniteScroll) {
        this.customerPage = this.customerPage + 1;
        		
        		this.getCustomers();
                setTimeout(() => {
		            infiniteScroll.complete();
		        }, 700);
        }getOrganizations(){
            if(this.organizationPage == 0) this.organizations = [];
            this.dataProvider.getData("Organization/Page/" + this.organizationPage).subscribe(response => {
                        var jsonString = JSON.stringify(response);
    					var jsonData = JSON.parse(jsonString);
    					console.log(jsonData);
                        this.organizations = this.organizations.concat(jsonData.content);
                    }, error => {
                        console.log('error');
                    });
        }

        doInfiniteOrganization(infiniteScroll) {
        this.organizationPage = this.organizationPage + 1;
        		
        		this.getOrganizations();
                setTimeout(() => {
		            infiniteScroll.complete();
		        }, 700);
        }

 loadProductModal(readOnly, mode,product) {
    let productModal = this.modalController.create(LeadProductPage, {"product" : product, "mode":mode, "readOnly" : readOnly});
    productModal.onDidDismiss(product => {
      if(product){
        console.log(product);
        this.product = product;
        if(mode=="Add") {
        	this.productPage =0;
        	this.getProducts();
        }
      }
       
    });
    productModal.present();
  }loadLeadModal(readOnly, mode,lead) {
    let leadModal = this.modalController.create(LeadLeadPage, {"lead" : lead, "mode":mode, "readOnly" : readOnly});
    leadModal.onDidDismiss(lead => {
      if(lead){
        console.log(lead);
        this.lead = lead;
        if(mode=="Add") {
        	this.leadPage =0;
        	this.getLeads();
        }
      }
       
    });
    leadModal.present();
  }loadCustomerModal(readOnly, mode,customer) {
    let customerModal = this.modalController.create(LeadCustomerPage, {"customer" : customer, "mode":mode, "readOnly" : readOnly});
    customerModal.onDidDismiss(customer => {
      if(customer){
        console.log(customer);
        this.customer = customer;
        if(mode=="Add") {
        	this.customerPage =0;
        	this.getCustomers();
        }
      }
       
    });
    customerModal.present();
  }loadOrganizationModal(readOnly, mode,organization) {
    let organizationModal = this.modalController.create(LeadOrganizationPage, {"organization" : organization, "mode":mode, "readOnly" : readOnly});
    organizationModal.onDidDismiss(organization => {
      if(organization){
        console.log(organization);
        this.organization = organization;
        if(mode=="Add") {
        	this.organizationPage =0;
        	this.getOrganizations();
        }
      }
       
    });
    organizationModal.present();
  }
}