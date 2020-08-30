import {Injectable} from '@angular/core';

@Injectable()
export class SingletonService {
    networkStatus = true;
    baseAPIUrl = 'http://localhost:8092'; //local
}