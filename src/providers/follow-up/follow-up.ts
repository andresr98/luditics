import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FollowUpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API : string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class FollowUpProvider {

  
  constructor(private http: HttpClient) {
    console.log('Hello FollowUpProvider Provider');
  }

  getBehavioralFollowUP(idStudent: number, typeCategory: number, date: string){
    return this.http.post<any>(API+"/seguimientos/", {"id_estudiante": idStudent, "tipo_categoria": typeCategory,
                                                 "fecha": date})//.map(result =>{ return result});
  } 

}
