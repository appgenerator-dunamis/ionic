import { Component } from '@angular/core';
import { NavController, ModalController, Events, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { NotificationPage } from '../Notification/notification';
import { DataProvider } from '../../services/data/data';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { SingletonService } from '../../services/singleton/singleton';
import { ToastController, Toast } from 'ionic-angular';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx'
import { subscribeOn } from '../../../node_modules/rxjs/operator/subscribeOn';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    active: boolean = false
    //Declaring Varibles 
    imgArrayPath: string = "assets/imgs/";
    networkStatus: any = true;
    selectedProperty = '';
    index = 0
    failedOfflineUpdates = [];

    images = ['Carousal_Image1.jpg', 'Carousal_Image2.jpg', 'Carousal_Image3.jpg'];

    sliderImg = ['Slider_image1.jpg', 'Slider_image2.jpg', 'Slider_image3.jpg'];

    recentMessages = [
                {
                    icon: 'dump-truck.svg',
                    mainContent: 'Radius Booking R435 - The train has arrived at the station',
                    time: '4 hours ago'
                },
                {
                    icon: 'dump-truck.svg',
                    mainContent: 'Radius Booking R435 - Customs Clearance Complete',
                    time: '5 hours ago'
                },
                {
                    icon: 'dump-truck.svg',
                    mainContent: 'Driver Data Management - Driver licence expires soon',
                    time: '6 hours ago'
                },
                {
                    icon: 'truck.svg',
                    mainContent: 'Radius Booking R436 - All containers loaded.',
                    time: '7 hours ago'
                }
    ]

    constructor(public navCtrl: NavController, public http: Http, public dataProvider: DataProvider,
        public network: Network, public storage: Storage, public modalCtrl: ModalController,
        public events: Events, public singlton: SingletonService, private toastCtrl: ToastController,
        public loadingCtrl: LoadingController, ) {

        this.network.onDisconnect().subscribe(() => {
            this.networkStatus = false;
            this.singlton.networkStatus = false;
            this.getStorageMessages();
        });
        this.network.onConnect().subscribe(() => {
            this.networkStatus = true;
            this.singlton.networkStatus = true;
        });
        if (this.networkStatus) {
           // Online
        } else {
            // Offline
        }
        this.events.unsubscribe('any:refreshSelectedProperty');
        this.events.subscribe('any:refreshSelectedProperty', () => {
          
        });

    }

    getStorageMessages() {
        let newMessages: any;
        this.storage.get('top3Messages').then((value) => {
            newMessages = value || [];
            this.recentMessages = newMessages;
        });
    }
 
    toast: Toast
    presentToast(message) {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });

        this.toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        this.toast.present();
    }
    ionViewDidLoad() {

        console.log("Home ionViewDidLoad");

        setInterval(() => {

            var loginDetails = JSON.parse(localStorage.getItem('USER_DETAILS'))
            if (this.singlton.networkStatus && loginDetails) {
                console.log('Polling....')
                this.storage.get('offlineUpdates').then(offlineUpdates => {
                    this.sync(offlineUpdates)
                })
            }
        }, 5000);
    }


    // size = array.size
    sync(offlineUpdates) {
        // this.storage.clear()

        let newOfflineUpdates = offlineUpdates;

        if (newOfflineUpdates && newOfflineUpdates.length > 0) {

            console.log(newOfflineUpdates.length);


            if (newOfflineUpdates[0].type == 'get') {
                this.dataProvider.getData1(newOfflineUpdates[0].apiUrl, null, null, null, null, false).subscribe(
                    res => {
                        console.log(newOfflineUpdates[0].apiUrl + " Success");
                        newOfflineUpdates.splice(0, 1);
                        this.storage.set("offlineUpdates", newOfflineUpdates);
                        this.sync(newOfflineUpdates);
                    },
                    error => {
                        console.log(newOfflineUpdates[0].apiUrl + " Failed");
                        newOfflineUpdates.splice(0, 1);
                        this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                        this.storage.set("offlineUpdates", newOfflineUpdates);
                        this.sync(newOfflineUpdates);
                    })
            }
            if (newOfflineUpdates[0].type == 'uploadImage') {
                // tempTripId
                console.log('Uploading Image')
                console.log(newOfflineUpdates[0])
                this.dataProvider.uploadImage(newOfflineUpdates[0].postObject.image).subscribe(res => {
                    console.log(res)
                    if(newOfflineUpdates[0].tag == 'setTripImage'){
                        if(newOfflineUpdates[0].postObject.tripId != null){
                            this.dataProvider.getData1(`/Image/SetTrip/Image/${res['id']}/Trip/${newOfflineUpdates[0].postObject.tripId}/TripTag/${newOfflineUpdates[0].postObject.weightType}`, null, null, null, null, false).subscribe(res => {
                                console.log(res);
                                if (res) {
                                    this.presentToast("Image Saved")
                                    newOfflineUpdates.splice(0, 1);
                            this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                            this.storage.set("offlineUpdates", newOfflineUpdates);
                            this.sync(newOfflineUpdates);
                                }
                                else {
                                this.presentToast("Image Not Saved")
                                    newOfflineUpdates.splice(0, 1);
                            this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                            this.storage.set("offlineUpdates", newOfflineUpdates);
                            this.sync(newOfflineUpdates);
                                }
        
                            }, (err) => {
                                this.presentToast("Something went wrong to upload Image")
                                newOfflineUpdates.splice(0, 1);
                                this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                                this.storage.set("offlineUpdates", newOfflineUpdates);
                                this.sync(newOfflineUpdates);
                            })
                        }

                        else{
                            if(newOfflineUpdates[0].postObject.tempTripId != null){
                                this.dataProvider.getData1(`/Image/SetTrip/Image/${res['id']}/TripTempId/${newOfflineUpdates[0].postObject.tempTripId}/TripTag/${newOfflineUpdates[0].postObject.weightType}`, null, null, null, null, false).subscribe(res => {
                                    console.log(res);
                                    if (res) {
                                        this.presentToast("Image Saved")
                                        newOfflineUpdates.splice(0, 1);
                                this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                                this.storage.set("offlineUpdates", newOfflineUpdates);
                                this.sync(newOfflineUpdates);
                                    }
                                    else {
                                    this.presentToast("Image Not Saved")
                                        newOfflineUpdates.splice(0, 1);
                                this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                                this.storage.set("offlineUpdates", newOfflineUpdates);
                                this.sync(newOfflineUpdates);
                                    }
            
                                }, (err) => {
                                    this.presentToast("Something went wrong to upload Image")
                                    newOfflineUpdates.splice(0, 1);
                                    this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                                    this.storage.set("offlineUpdates", newOfflineUpdates);
                                    this.sync(newOfflineUpdates);
                                })
                            }
                        }
                        
                    }
                    else{
                        console.log('No Images Found')
                    }
                },(err) => {
                    this.presentToast("Image Not Uploaded")
                    newOfflineUpdates.splice(0, 1);
                    this.failedOfflineUpdates.push(newOfflineUpdates[0]);
                    this.storage.set("offlineUpdates", newOfflineUpdates);
                    this.sync(newOfflineUpdates);
                })
            }

        }

    }

}