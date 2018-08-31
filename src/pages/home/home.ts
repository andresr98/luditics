import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import {SeguimientosPage} from "../seguimientos/seguimientos"

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  lista = [
    [
      { nombre: "Mateo", apellido: "Garcia", id : 1 , impulsividad : 5, frustracion : 5,
       aislamiento : 5, solidaridad : 5, armonioso : 3},

      { nombre: "Daniela", apellido: "Alzate", id : 2, impulsividad : 4, frustracion : 4,
       aislamiento : 4, solidaridad : 4, armonioso : 4},

      { nombre: "Doly", apellido: "Jimenez", id : 3, impulsividad : 3, frustracion : 3,
       aislamiento : 3, solidaridad : 3, armonioso : 3},

      { nombre: "Santiago", apellido: "Ramirez",id : 4, impulsividad : 2, frustracion : 2,
       aislamiento : 2, solidaridad : 2, armonioso : 2},

      { nombre: "Camilo", apellido: "Alvarez",id : 5, impulsividad : 1, frustracion : 1,
       aislamiento : 1, solidaridad : 1, armonioso : 1 },

      { nombre: "Andrés", apellido: "Ruiz" ,id : 6 , impulsividad : 6, frustracion : 6,
       aislamiento : 6, solidaridad : 6, armonioso : 6},

      { nombre: "Alejo", apellido: "Gallego" ,id : 7 , impulsividad : 7, frustracion : 7,
       aislamiento : 7, solidaridad : 7, armonioso : 7},

      { nombre: "Andrés", apellido: "Alvarez" ,id : 8, impulsividad :8, frustracion : 8,
       aislamiento : 8, solidaridad :8, armonioso : 8 }
    ]
    /*[
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" }
    ]*/
  ];
  constructor(public navCtrl: NavController) {}

  getValores(est) {
    this.navCtrl.push(SeguimientosPage, {
      estudiante: est,
    });
  }
}
