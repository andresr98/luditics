import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FollowUpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API : string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class FollowUpProvider {

  
  constructor(private http: HttpClient) {
  }

  getBehavioralFollowUP(idStudent: number, typeCategory: number, date: string){
    return this.http.post<any>(API+"/seguimientos/", {"id_estudiante": idStudent, 
                                                      "tipo_categoria": typeCategory,
                                                      "fecha": date});
  } 

  getCognitiveFollowUp(idStudent: number, typeCategory: number, date: string){
    return this.http.post<any>(API+"/seguimientos/", {"id_estudiante" : idStudent,
                                                      "tipo_categoria": typeCategory,
                                                      "fecha": date})
  }

  updateFollowUP(idStudent: number, idCategory: number, date:string, accumulator: number){
    return this.http.put<any>(API + "/seguimientos/", { "id_estudiante": idStudent,
                                                        "id_categoria": idCategory,
                                                        "fecha": date,
                                                        "acumulador": accumulator});
  }

  getCategoryData(idGroup:number, date:string){
    return this.http.post<any>(API+"/seguimientoxestudiante/", {"id_grupo":idGroup,
                                                                "fecha":date});
  }

}
