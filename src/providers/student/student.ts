import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API: string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class StudentProvider {
  constructor(public http: HttpClient) {
  }

  getStudents() {
    return this.http.get<any>(API + "/estudiantes/");
  }
  
  /*getStudentsByGroup(group: number){
    return this.http.post<any>(API + "/estudiantes/", {"grupo": group});
  }*/

  getStudentsByGroup(group: number){
    return this.http.get<any>(API + "/estudiantes?id_grupo="+group);
  }

  updateStudent(id_group:number, id_student: number, row:number,col:number){
    return  this.http.put<any>(API+"/grupoxestudiantes",{"id_grupo":id_group, "id_estudiante":id_student,"fila":row,"columna":col});
  }
}
