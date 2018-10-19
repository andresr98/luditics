import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Group } from '../../models/Group';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  group : Group;

  constructor(public navCtrl: NavController, public navParams : NavParams, private screenO: ScreenOrientation) {
    this.navCtrl = this.navParams.data.nav;
    this.group = this.navParams.data.group;
  }

  backToSettings(){
    this.navCtrl.popToRoot();
  }

  ionViewCanEnter() {
    //this.screenO.lock('landscape');
  }
}
