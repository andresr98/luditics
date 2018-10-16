import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

//Importar cada página en para los tabs

import { HomePage } from "../home/home";
import { AssistancePage } from "../assistance/assistance";

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";


@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  //Se asignan a una variable para bindarse a la página
  homePage = HomePage;
  assistancePage = AssistancePage;

  constructor(public navCtrl: NavController, private screenO : ScreenOrientation) {
  }

  ionViewCanEnter(){
    //this.screenO.lock('landscape');
  }
}
