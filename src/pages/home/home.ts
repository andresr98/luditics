//Importación de componentes ionic
import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";
import { isNil } from "lodash";

//Importación de paginas
import { SeguimientosPage } from "../seguimientos/seguimientos";

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";

//Importación de modelos y providers.
import { StudentProvider } from "../../providers/student/student";
import { Student } from "../../models/Student";
import { Group } from "../../models/Group";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  //Se crea la cuadricula de estudiantes.
  list: Student[][] = [];
  group: Group;

  /*Se inyectan las dependencias de: Controlador de vistas
     *Controlador de orientación de pantalla
     *Provider para obtener los estudiantes desde el back */
  constructor(public navCtrl: NavController,
    private screenO: ScreenOrientation,
    private studentProvider: StudentProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navParams: NavParams) {

    //Mostrar información de carga y traer los estudiantes de la base de datos
    this.group = this.navParams.data.group;
    this.getStudents(this.group.grupo__id);
  }

  getStudents(idGroup : number) {
    var loading = this.loadingCtrl.create({
      content: "Cargando Estudiantes..."
    });
    loading.present();
    this.studentProvider.getStudentsByGroup(idGroup).subscribe(
      data => {
        //Data es una variable que contiene:
        /**data.status = es el valor HTTP de respuesta
         * data.entity = es el resultado esperado de la consulta
         * data.error = es un error personalizado para ser mostrado al usuario
         ***/
        //Se cierra el mensaje de carga
        loading.dismissAll();
        this.list = this.sortStudentsByIndex(data.entity);
      },
      //En caso de pérdida de conexión a internet
      error => {
        loading.dismissAll();
        this.showMessage(
          "Verifique su conexión a internet. No se puede acceder al servidor"
        );
      }
    );
  }

  ionViewCanEnter() {
    //this.screenO.lock('landscape');
  }

  //Se ordenan los estudiantes por fila y columnas. Según orden del profesor
  sortStudentsByIndex(data: Student[]): Student[][] {
    return data.reduce<Student[][]>((accumulator, student, index) => {
      const row = Math.floor(index / 5);
      const column = index % 5;

      if (isNil(accumulator[row])) {
        accumulator[row] = [];
      }

      accumulator[row][column] = student;
      return accumulator;
    }, []);
  }

  //Se envian los valores del estudiante a la pagina de seguimientos.
  sendValues(student) {
    //Push(página, parametros (opcional))
    this.navCtrl.push(SeguimientosPage, {
      student: student
    });
  }

  //Mensajes mostrados en estilo toast.
  showMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }
}
