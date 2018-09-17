import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { SeguimientosPage } from "../seguimientos/seguimientos";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { isNil } from "lodash";
import { StudentProvider } from "../../providers/student/student";
import { Estudiante } from "../../models/Estudiante";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  lista: Estudiante[][] = [];
  constructor(
    public navCtrl: NavController,
    private screenO: ScreenOrientation,
    private student: StudentProvider
  ) {
    //Activar cuando se pase a producción
    //this.screenO.lock('landscape');
    this.student.obtenerSeguimiento().subscribe(data => {
      this.lista = this.sortStudentsByIndex(data);
      console.log(data);
    });
  }

  sortStudentsByIndex(data: Estudiante[]): Estudiante[][] {
    return data.reduce<Estudiante[][]>((acum, estudiante, index) => {
      const fila = Math.floor(index / 5);
      const columna = index % 5;

      if (isNil(acum[fila])) {
        acum[fila] = [];
      }

      acum[fila][columna] = estudiante;
      return acum;
    }, []);
  }

  getValores(est) {
    this.navCtrl.push(SeguimientosPage, {
      estudiante: est
    });
  }
}
