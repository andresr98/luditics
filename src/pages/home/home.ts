//Importación de componentes ionic
import { Component } from "@angular/core";
import { NavController, ToastController, LoadingController } from "ionic-angular";
import { isNil } from "lodash";

//Importación de paginas
import { SeguimientosPage } from "../seguimientos/seguimientos";

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";

//Importación de modelos y providers.
import { StudentProvider } from "../../providers/student/student";
import { Student } from "../../models/Student";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  //Se crea la cuadricula de estudiantes.
  list: Student[][] = [];

    /*Se inyectan las dependencias de: Controlador de vistas
     *Controlador de orientación de pantalla
     *Provider para obtener los estudiantes desde el back */
  constructor(public navCtrl: NavController,
              private screenO: ScreenOrientation,
              private studentProvider: StudentProvider,
              private toastCtrl : ToastController,
              private loadingCtrl: LoadingController) {

    //Activar cuando se pase a producción
    //this.screenO.lock('landscape');

    //Mostrar información de carga y traer los estudiantes de la base de datos
    var loading = this.loadingCtrl.create({ content: "Cargando Estudiantes..." });
    loading.present();
    this.studentProvider.getStudentsByGroup(2).subscribe(data => {

      //Data es una variable que contiene: 
      /**data.status = es el valor HTTP de respuesta
       * data.entity = es el resultado esperado de la consulta
       * data.error = es un error personalizado para ser mostrado al usuario
       ***/
      if(data.status != 200){
        return false;
      }
      //Se cierra el mensaje de carga
      loading.dismissAll()
      this.list = this.sortStudentsByIndex(data.entity);
      return true;
    },
    //En caso de pérdida de conexión a internet
    error => {
      loading.dismissAll();
      this.showMessage("Verifique su conexión a internet. No se puede acceder al servidor");
    });
  }

  ionViewCanEnter(){
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
  showMessage(message : string){
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }
}
