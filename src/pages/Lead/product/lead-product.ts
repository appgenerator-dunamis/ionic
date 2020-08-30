import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../../services/data/data';
import { UrlResolver } from '@angular/compiler';
import * as moment from 'moment';
import { SingletonService } from '../../../services/singleton/singleton';

@Component({
  selector: 'lead-product',
  templateUrl: 'lead-product.html',
})
export class LeadProductPage {
  mode;
  readOnly;
  product;
  
  

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public dataProvider: DataProvider, public singleton: SingletonService) {
	  this.mode = navParams.get("mode");
	  this.readOnly = navParams.get("readOnly");
	  this.product = navParams.get("product");

	  
  }

  ionViewDidLoad() {
  	  	
  }

  onStartTime() {  
  }

  closeModal() {
    this.viewCtrl.dismiss(this.product);
  }

  save(){
    if(this.mode == "Add" ){
      console.log('Adding');

      this.dataProvider.postData("Product",this.product).subscribe(response => {
          console.log("Added");
      }, error => {
          console.log('error');
          console.log("Add Failed");
      });

      this.viewCtrl.dismiss(this.product);
    }else{
      console.log('Updating');

      this.dataProvider.postData("Product",this.product).subscribe(response => {
          console.log("Updated");
      }, error => {
          console.log('error');
          console.log("Update Failed");
      });

      this.viewCtrl.dismiss(this.product);
    }
  }

  
}