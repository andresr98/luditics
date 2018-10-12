//Componentes de Ionic
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { isNil } from "lodash";

//Importación de provider
import {AssistanceProvider} from '../../providers/assistance/assistance';

import {Assistance} from '../../models/Assistance';

@IonicPage()
@Component({
  selector: "page-assistance",
  templateUrl: "assistance.html"
})
export class AssistancePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private assistanceProvider : AssistanceProvider) {}

  tapEvent(event) {
    event.target.classList.toggle("late");
    event.target.classList.remove("miss");
    event.preventDefault();
  }
  pressEvent(event) {
    event.target.classList.toggle("miss");
    event.target.classList.remove("late");
    event.preventDefault();
  }

  sortStudentsByIndex(data: Assistance[]): Assistance[][] {
    return data.reduce<Assistance[][]>((accumulator, assistance, index) => {
      const row = Math.floor(index / 5);
      const column = index % 5;

      if (isNil(accumulator[row])) {
        accumulator[row] = [];
      }

      accumulator[row][column] = assistance;
      return accumulator;
    }, []);
  }
}
