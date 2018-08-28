import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Estudiante } from '../../models/Estudiante';
import { Categoria } from "../../models/Categoria"
import { DatosComportamental } from '../../models/DatosComportamental';

/**
 * Generated class for the ValoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valores',
  templateUrl: 'valores.html',
})
export class ValoresPage {

  type: Categoria = {firstL : "",secondL :""};
  datos : any[]
  dato : DatosComportamental = {categoria :"", repeticiones : 0, icono : ""};
  estudiante : Estudiante;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.estudiante = navParams.get("estudiante");
    this.type.firstL = "Comportamiento";

    let categorias = ["Aislamiento","Frustración","Impulsividad", "Solidaridad", "Armonioso"];

    let imagenes = ["assets/icon/Aislamiento.png","assets/icon/Frustracion.png","assets/icon/Impulsividad.png",
                    "assets/icon/Solidaridad.png","assets/icon/Armonioso.png"];

    let repeticiones = [this.estudiante.aislamiento,this.estudiante.frustracion,this.estudiante.impulsividad,
                        this.estudiante.solidaridad,this.estudiante.armonioso]
    this.datos = [];

    for(let i=0; i< categorias.length; i++)
    {
      this.dato = {categoria :"", repeticiones : 0, icono : ""};

      this.dato.categoria = categorias[i];
      this.dato.icono = imagenes[i];
      this.dato.repeticiones = repeticiones[i];
      this.datos.push(this.dato);
    }
  }

  private sumarCategoria(dato)
  {
    this.dato = dato;
    this.dato.repeticiones++;
    //Aquí se llama al servicio para sumarle uno
    switch(this.dato.categoria)
    {
      case "Aislamiento" :
      {
        this.estudiante.aislamiento = this.dato.repeticiones;
      }
      case "Frustración" : 
      {
        this.estudiante.frustracion = this.dato.repeticiones;
      }
      case "Impulsividad" : 
      {
        this.estudiante.impulsividad = this.dato.repeticiones;
      }
      case "Solidaridad" : 
      {
        this.estudiante.solidaridad = this.dato.repeticiones;
      }
      case "Armonioso" : 
      {
        this.estudiante.armonioso = this.dato.repeticiones;
      }
    }
  }

  private restarCategoria(dato)
  {
    this.dato = dato;
    this.dato.repeticiones--;

    if(this.dato.repeticiones < 0)
    {
      this.dato.repeticiones = 0
    }
    switch(this.dato.categoria)
    {
      case "Aislamiento" :
      {
        this.estudiante.aislamiento = this.dato.repeticiones;
      }
      case "Frustración" : 
      {
        this.estudiante.frustracion = this.dato.repeticiones;
      }
      case "Impulsividad" : 
      {
        this.estudiante.impulsividad = this.dato.repeticiones;
      }
      case "Solidaridad" : 
      {
        this.estudiante.solidaridad = this.dato.repeticiones;
      }
      case "Armonioso" : 
      {
        this.estudiante.armonioso = this.dato.repeticiones;
      }
    }
  }
}
