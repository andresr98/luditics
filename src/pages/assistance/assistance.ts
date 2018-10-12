import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Student } from "../../models/Student";

@IonicPage()
@Component({
  selector: "page-assistance",
  templateUrl: "assistance.html"
})
export class AssistancePage {
  list: Student[][] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AssistancePage");
  }

  tapEvent(event) {
    console.log(event.target.classList);
    event.target.classList.toggle("late");
    event.target.classList.remove("miss");
    event.preventDefault();
  }
  pressEvent(event) {
    console.log(event.target.classList);
    event.target.classList.toggle("miss");
    event.target.classList.remove("late");
    event.preventDefault();
  }
}
