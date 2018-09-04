import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import {SeguimientosPage} from "../seguimientos/seguimientos";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  lista = [
    [
      {},
      {},
      { nombre: "Joseph", apellido: "", id : 1 , impulsividad : 5, frustracion : 5,
       aislamiento : 5, solidaridad : 5, armonioso : 3},

      { nombre: "Emanuel", apellido: "S.", id : 2, impulsividad : 4, frustracion : 4,
       aislamiento : 4, solidaridad : 4, armonioso : 4},

      { nombre: "Juan Sebastián", apellido: "", id : 3, impulsividad : 3, frustracion : 3,
       aislamiento : 3, solidaridad : 3, armonioso : 3},

    ],
    [
      { nombre: "Juan Diego", apellido: "",id : 4, impulsividad : 1, frustracion : 1,
      aislamiento : 1, solidaridad : 1, armonioso : 1 },

     { nombre: "Carla", apellido: "" ,id : 5 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "María C.", apellido: "" ,id : 6 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Claudia", apellido: "" ,id : 7 , impulsividad : 7, frustracion : 7,
      aislamiento : 7, solidaridad : 7, armonioso : 7},
     
     {}
    ],
    [
      { nombre: "Juan Daniel", apellido: "",id : 8, impulsividad : 1, frustracion : 1,
      aislamiento : 1, solidaridad : 1, armonioso : 1 },

     { nombre: "Emanuel", apellido: "" ,id : 9 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Ashly", apellido: "" ,id : 10 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Emiliana", apellido: "" ,id : 11 , impulsividad : 7, frustracion : 7,
      aislamiento : 7, solidaridad : 7, armonioso : 7},

     { nombre: "Sofía", apellido: "" ,id : 12, impulsividad :8, frustracion : 8,
      aislamiento : 8, solidaridad :8, armonioso : 8 }
    ],
    [
      { nombre: "Jaerock Lee", apellido: "",id : 13, impulsividad : 1, frustracion : 1,
      aislamiento : 1, solidaridad : 1, armonioso : 1 },

     { nombre: "David Santiago", apellido: "" ,id : 14 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Santiago", apellido: "" ,id : 15 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Lina Mosquera", apellido: "" ,id : 16 , impulsividad : 7, frustracion : 7,
      aislamiento : 7, solidaridad : 7, armonioso : 7},

     { nombre: "Leyre", apellido: "" ,id : 17, impulsividad :8, frustracion : 8,
      aislamiento : 8, solidaridad :8, armonioso : 8 }
    ],
    [
      { nombre: "Sara", apellido: "",id : 18, impulsividad : 1, frustracion : 1,
      aislamiento : 1, solidaridad : 1, armonioso : 1 },

     { nombre: "Juan Felipe", apellido: "" ,id : 19 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Isabella", apellido: "" ,id : 20 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Juan José", apellido: "" ,id : 21 , impulsividad : 7, frustracion : 7,
      aislamiento : 7, solidaridad : 7, armonioso : 7},

     { nombre: "Emmanuel", apellido: "" ,id : 22, impulsividad :8, frustracion : 8,
      aislamiento : 8, solidaridad :8, armonioso : 8 }
    ],
    [
      { nombre: "Edison", apellido: "",id : 23, impulsividad : 1, frustracion : 1,
      aislamiento : 1, solidaridad : 1, armonioso : 1 },

     { nombre: "Yeison", apellido: "A." ,id : 24 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Kyanya", apellido: "P." ,id : 25 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Everlides", apellido: "" ,id : 26 , impulsividad : 7, frustracion : 7,
      aislamiento : 7, solidaridad : 7, armonioso : 7},

     { nombre: "Isabel", apellido: "Ochoa" ,id : 27, impulsividad :8, frustracion : 8,
      aislamiento : 8, solidaridad :8, armonioso : 8 }
    ],
    [
      { nombre: "Fabián", apellido: "",id : 28, impulsividad : 1, frustracion : 1,
      aislamiento : 1, solidaridad : 1, armonioso : 1 },

     { nombre: "Amelie", apellido: "" ,id : 29 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Juan Miguel", apellido: "" ,id : 30 , impulsividad : 6, frustracion : 6,
      aislamiento : 6, solidaridad : 6, armonioso : 6},

     { nombre: "Sammantha", apellido: "" ,id : 31 , impulsividad : 7, frustracion : 7,
      aislamiento : 7, solidaridad : 7, armonioso : 7},

     { nombre: "Samuel", apellido: "J." ,id : 32, impulsividad :8, frustracion : 8,
      aislamiento : 8, solidaridad :8, armonioso : 8 }
    ]
  ];
  constructor(public navCtrl: NavController, private screenO : ScreenOrientation) {
    //Activar cuando se pase a producción
    //this.screenO.lock('landscape');
  }

  getValores(est) {
    this.navCtrl.push(SeguimientosPage, {
      estudiante: est,
    });
  }
}
