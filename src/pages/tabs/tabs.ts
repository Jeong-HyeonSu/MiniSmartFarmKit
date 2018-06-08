import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  serialNumber : any;

  tab1Title = "Home";
  tab2Title = "Environment";
  tab3Title = "Setting";

  serial : object;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this. serialNumber = navParams.get('serialNumber')
    console.log("tabs nav parm : ", this.serialNumber)

    this.serial = this.serialNumber;
    console.log("tabs data nav parm : ", this.serial)
  }
}
