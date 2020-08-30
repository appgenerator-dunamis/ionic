import {Component} from '@angular/core';
import {NavController, NavParams, Nav, LoadingController, ToastController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {TabsPage} from '../../pages/tabs/tabs';
import {SingletonService} from '../../services/singleton/singleton';
import {HomePage} from '../home/home';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    username = '';
    password = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public singleton: SingletonService,
        public http: Http, public nav: Nav, public loadingCtrl: LoadingController,
        public toastCtrl: ToastController) {
    }

    userLogin() {
        if (this.username == '') {
            let loading2 = this.loadingCtrl.create({
                spinner: 'hide',
                content: 'Please enter username'
            });
            loading2.present();
            setTimeout(() => {
                loading2.dismiss();
            }, 2000);
        } else if (this.password == '') {
            let loading2 = this.loadingCtrl.create({
                spinner: 'hide',
                cssClass: 'custom-loader',
                content: 'Please enter password'
            });
            loading2.present();
            setTimeout(() => {
                loading2.dismiss();
            }, 2000);
        } else {
            let headers = new Headers();
            headers.append('Authorization', 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==');
            let options = new RequestOptions({headers: headers});
            let body = new FormData();
            body.append('username', this.username);
            body.append('grant_type', 'password');
            body.append('password', this.password);
            body.append('client_id', 'clientapp');
            this.http.post(this.singleton.baseAPIUrl + '/oauth/token', body, options).subscribe(response => {
                let resultData = JSON.parse(response['_body']);
                if (response.status == 200) {
                    localStorage.setItem("USER_DETAILS", JSON.stringify(resultData));
                    if(localStorage.getItem("USER_DETAILS")){
                        this.nav.setRoot(TabsPage);
                    }
                   
                }
            }, error => {
                console.log('error');
            });
        }
    } 
}