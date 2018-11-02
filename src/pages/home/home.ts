//Importación de componentes ionic
import { Component} from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";

//Importación de paginas
import { SeguimientosPage } from "../seguimientos/seguimientos";

//Importación de componentes nativos
import { ScreenOrientation } from "@ionic-native/screen-orientation";

//Importación de modelos y providers.
import { StudentProvider } from "../../providers/student/student";
import { Student } from "../../models/Student";
import { Group } from "../../models/Group";
import { UtilitiesProvider } from "../../providers/utilities/utilities";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  //Se crea la cuadricula de estudiantes.
  list: Student[][] = [];
  group: Group;
  connectionError : boolean;
  noStudents : boolean;

  /*Se inyectan las dependencias de: Controlador de vistas
     *Controlador de orientación de pantalla
     *Provider para obtener los estudiantes desde el back */
  constructor(public navCtrl: NavController,
    private screenO: ScreenOrientation,
    private studentProvider: StudentProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private utilitiesProvider: UtilitiesProvider) {

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
        let sortStududents = this.utilitiesProvider.sortStudents(data.entity);

        if(sortStududents.length > 0){
          this.list = this.utilitiesProvider.setEmptyStudent(sortStududents);
        }
    
        if(this.list.length == 0){
          this.noStudents = true;
        }
        loading.dismissAll();
        this.connectionError = false;
      },
      //En caso de pérdida de conexión a internet
      error => {
        loading.dismissAll();
        this.showMessage(
          "Verifique su conexión a internet. No se puede acceder al servidor"
        );
        this.connectionError = true;
      }
    );
  }
  
  retry(){
    this.getStudents(this.group.grupo__id);
  }
  ionViewCanEnter() {
    //this.screenO.lock('landscape');
    this.connectionError = false;
    this.noStudents = false;
  }

  //Se envian los valores del estudiante a la pagina de seguimientos.
  sendValues(event, student) {
    //Push(página, parametros (opcional))
    this.navCtrl.push(SeguimientosPage, {
      student: student,
      group :this.group
    });
    event.preventDefault();
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
