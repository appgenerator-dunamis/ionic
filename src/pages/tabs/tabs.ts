import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import { LeadPage } from '../Lead/lead';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = HomePage;
    tab2Root = LeadPage;

    constructor() {}
}