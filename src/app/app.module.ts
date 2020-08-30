import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HeaderPage } from '../pages/header/header';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotificationPage } from '../pages/Notification/notification';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../services/data/data';
import { SingletonService } from '../services/singleton/singleton';
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { ImagePicker } from '@ionic-native/image-picker';
import { Printer  } from '@ionic-native/printer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener'
import { FileTransfer } from '@ionic-native/file-transfer';
import { QRScanner} from '@ionic-native/qr-scanner';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { StarRatingModule } from 'ionic3-star-rating';
import { LeadPage } from '../pages/Lead/lead';
import { LeadCustomerPage } from '../pages/Lead/Customer/lead-customer';
import { LeadLeadPage } from '../pages/Lead/Lead/lead-lead';
import { LeadOrganizationPage } from '../pages/Lead/Organization/lead-organization';



@NgModule({
    declarations: [
        MyApp,
        HomePage,
        HeaderPage,
        NotificationPage,
        TabsPage,
        LoginPage,
        LeadPage,
        LeadCustomerPage,
        LeadLeadPage,
        LeadOrganizationPage,
        LeadOrganizationPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true }),
        IonicStorageModule.forRoot(),
        BrowserAnimationsModule,
        ChartsModule,
        StarRatingModule,
        
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        HeaderPage,
        NotificationPage,
        TabsPage,
        LoginPage,
        LeadPage,
        LeadCustomerPage,
        LeadLeadPage,
        LeadOrganizationPage,
        LeadOrganizationPage
    ],
    providers: [
        Printer,
        StatusBar,
        SplashScreen,
        NativePageTransitions,
        DataProvider,
        SingletonService,QRScanner,
        Network, Camera,ImagePicker,DatePipe,Base64ToGallery,InAppBrowser,DocumentViewer,File,
        FileOpener,FileTransfer,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }