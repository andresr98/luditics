import { Component } from "@angular/core";
import { IonicPage, NavController,NavParams } from "ionic-angular";

//Importar cada página en para los tabs

import { HomePage } from "../home/home";
import { AssistancePage } from "../assistance/assistance";
import {SettingsPage} from '../settings/settings'

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Group } from "../../models/Group";
import { UbicationPage } from "../ubication/ubication";



@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  //Se asignan a una variable para bindarse a la página
  homePage = HomePage;
  assistancePage = AssistancePage;
  settingsPage = SettingsPage;
  ubicationPage = UbicationPage;

  params : any = {};

  constructor(public navCtrl: NavController, private screenO : ScreenOrientation,
    private navParams : NavParams) {

    this.params.group = this.navParams.get("group");
    this.params.nav = this.navParams.get("nav");
  }

  ionViewCanEnter(){
    //this.screenO.lock('landscape');
  }
}
