import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from '../../services/data/data';
import {Storage} from '@ionic/storage';
import {SingletonService} from '../../services/singleton/singleton';

@Component({
    selector: 'page-notify',
    templateUrl: 'notification.html'
})
export class NotificationPage {
    // Variable Declration
    imgArrayPath = "assets/imgs/";
    messagePaginationPage = 1;
    isStopInfiniteScroll = false;

    messages = [
        //        {
        //            icon: 'alertIcon.svg',
        //            mainContent: 'Please note that the Maintenance charges for the quarter April-June 2018 is tomorrow',
        //            time: '4 hours ago'
        //        },
        //        {
        //            icon: 'alertIcon1.svg',
        //            mainContent: 'Please note that the  Maintenance charges for the quarter April-June 2018 is tomorrow',
        //            time: '5 hours ago'
        //        },
        //        {
        //            icon: 'visitorAlert.svg',
        //            mainContent: 'Please note that the  Maintenance charges for the quarter April-June 2018 is tomorrow',
        //            time: '6 hours ago'
        //        },
        //        {
        //            icon: 'alertIcon2.svg',
        //            mainContent: 'Please note that the  Maintenance charges for the quarter April-June 2018 is tomorrow',
        //            time: '7 hours ago'
        //        },
    ]

    constructor(public navCtrl: NavController, public dataProvider: DataProvider, public storage: Storage, public singleton: SingletonService) {
        if (this.singleton.networkStatus) {
            this.getAllMessage();
        }else{
            this.getStorageNotifications();
        }
    }
    getStorageNotifications(){
        this.storage.get('notificationMessages').then((value) => {
            this.messages = value || [];
        });
    }
    getAllMessage() {
        this.dataProvider.getData1("DKMessage/GetPagedMessages/"+this.messagePaginationPage, null, null, null, null, false).subscribe(response => {
            let newMessages:any;
            newMessages = response || [];
            if(newMessages.length == 0){
                this.isStopInfiniteScroll = true;
            }
            this.messages = this.messages.concat(newMessages);
            this.storage.set('notificationMessages', this.messages);
        }, error => {
            console.log('error');
        });
    }
    doInfinite(infiniteScroll) {
        this.messagePaginationPage = this.messagePaginationPage + 1;
        this.getAllMessage();
        setTimeout(() => {
            infiniteScroll.complete();
        }, 700);
    }
    
}