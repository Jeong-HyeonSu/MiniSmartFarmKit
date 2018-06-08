import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})


export class WelcomePage {

  serialNumber : string;
  userRef : any;
  checkStart : any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, 
    public afDB : AngularFireDatabase, public alertCtrl: AlertController) { 


  }

  login() {

    var trans;

    console.log(this.serialNumber)

    this.userRef = "userFarm/" + this.serialNumber;

    this.afDB.object(this.userRef).snapshotChanges().take(1).subscribe((item) => {

      if(!item.key) {
        let alert = this.alertCtrl.create({
          title: 'Wrong serial Number',
          subTitle: 'Please check the right serial Number.',
          buttons: ['Dismiss']
        });
        alert.present();
      }
      
      else {
        trans = item.payload.val().numberOfPlants;

        if(trans != '0') {
          this.navCtrl.setRoot('TabsPage', {serialNumber : this.serialNumber}, {
            animate: true,
            direction: 'forward'
          });
        }
        else {
          this.navCtrl.setRoot('SearchPage', {serialNumber : this.serialNumber}, {
            animate: true,
            direction: 'forward'
          });
        }
      }
    })
   
  }
}
