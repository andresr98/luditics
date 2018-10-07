import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

//Importar cada página en para los tabs
import { HomePage } from "../home/home";
import { AssistancePage } from "../assistance/assistance";
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  //Se asignan a una variable para bindarse a la página
  homePage = HomePage;
  assistancePage = AssistancePage;
  constructor(public navCtrl: NavController) {}
}
