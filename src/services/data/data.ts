import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SingletonService} from '../../services/singleton/singleton';
import { of } from 'rxjs/observable/of';
import { catchError, last } from 'rxjs/operators';

import {ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from '../../../node_modules/rxjs';
import { Http } from '@angular/http';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    newOfflineUpdates = [];
    date:Date = new Date();

    userLoginDetails = JSON.parse(window.localStorage.getItem('USER_DETAILS'));
    constructor(public http: HttpClient, public _http: Http, public singleton: SingletonService , public toastCtrl: ToastController, public storage: Storage) {
        console.log('Hello DataProvider Provider');
        console.log(this.userLoginDetails);
    }

    getData(url) {
        var loginDetails = JSON.parse(localStorage.getItem('USER_DETAILS'))
        // console.log(loginDetails)
        return this.http.get(`${this.singleton.baseAPIUrl}/${url}?access_token=${loginDetails['access_token']}`);
    }

    postData(url, data) {
        return this.http.post(`${this.singleton.baseAPIUrl}/${url}`, data);
    }

    uploadImage(imageData) {
        // base 64 to blob conversion
        var byteCharacters = atob(imageData);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'data:image/png' });

        // creating form data
        var formData: any = new FormData();
        formData.append('file', blob);
        formData.append('image', JSON.stringify({ fileName: 'sample.png' }));
       
        return this.http.post( `${this.singleton.baseAPIUrl}/Image/Upload` , formData ).pipe(
            
            last(), // return last (completed) message to caller
            catchError(this.handleError(formData))
        );
        
    }

    private handleError(file: File) {
        const userMessage = `${file.name} upload failed.`;

        return (error: HttpErrorResponse) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            const message = (error.error instanceof Error) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            //   this.messageService.add(`${userMessage} ${message}`);

            // Let app keep running but indicate failure.
            return of(userMessage);
        };
    }

    

    getData1(url,tag, postObject,offlineApi, type, storageFlag) {
        if(this.singleton.networkStatus == true){
            console.log('Data Online')
            var loginDetails = JSON.parse(localStorage.getItem('USER_DETAILS'))
            return this.http.get(`${this.singleton.baseAPIUrl}/${url}?access_token=${loginDetails['access_token']}` );
        }
        else {
            console.log('Data Offline')
            if(storageFlag == true){
                this.setOfflineStorage(tag, postObject,offlineApi, type)
            }
            return Observable.of(null)
           
        }
    }
    setOfflineStorage(tag, postObject,apiUrl, type){
        console.log('Setting Offline storage')

       this.date = new Date();
        let value = {
            "id":1,
            "tag":tag,
            "postObject": postObject,
            "apiUrl": apiUrl,
            "type": type,
            "updatedDate":this.date
        }
        this.storage.get('offlineUpdates').then((offlineUpdates) => {
           if(offlineUpdates != null && offlineUpdates.length > 0){
            console.log('There is ..')
            this.newOfflineUpdates = offlineUpdates
               console.log(offlineUpdates);
               value.id = offlineUpdates[offlineUpdates.length - 1].id + 1;
               this.newOfflineUpdates.push(value);
               console.log(this.newOfflineUpdates)
            this.storage.set('offlineUpdates', this.newOfflineUpdates);
           } else{
            console.log('New')
            this.storage.set('offlineUpdates', [value]);
           }
        })
       
    }

    getPDF(url): Observable<any> {
        var loginDetails = JSON.parse(localStorage.getItem('USER_DETAILS'))
        return this._http.get(`${this.singleton.baseAPIUrl}/${url}?access_token=${loginDetails['access_token']}`)
            .do(data => console.log((data)))

    }
}