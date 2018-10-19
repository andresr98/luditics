import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Group } from '../../models/Group';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  group : Group;

  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.navCtrl = this.navParams.data.nav;
    this.group = this.navParams.data.group;
  }

  backToSettings(){
    this.navCtrl.popToRoot();
  }
}
