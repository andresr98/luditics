import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ValoresPage } from "../valores/valores";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  lista = [
    [
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" }
    ],
    [
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" }
    ],
    [
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" }
    ],
    [
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" }
    ],
    [
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" },
      { nombre: "nombre0", apellido: "apellido" },
      { nombre: "nombre1", apellido: "apellido" },
      { nombre: "nombre2", apellido: "apellido" },
      { nombre: "nombre3", apellido: "apellido" }
    ]
  ];
  constructor(public navCtrl: NavController) {}

  getValores(id) {
    console.log(id)
    this.navCtrl.push(ValoresPage, {
      idEstudiante :id
    });
  }
}
