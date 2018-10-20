import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API: string = "http://andresr.pythonanywhere.com/";
@Injectable()
export class StudentProvider {
  constructor(public http: HttpClient) {}

  getStudents() {
    return this.http.get<any>(API + "/estudiantes/");
  }

  getStudentsByGroup(group: number) {
    return this.http.get<any>(API + "/estudiantes?id_grupo=" + group);
  }

  updateStudent(
    id_group: number,
    id_student: number,
    row: number,
    col: number
  ) {
    return this.http.put<any>(API + "/grupoxestudiantes", {
      id_grupo: id_group,
      id_estudiante: id_student,
      fila: row,
      columna: col
    });
  }

  getBehavioralFollowUP(idStudent: number, typeCategory: number, date: string) {
    return this.http.post<any>(API + "/seguimientos/", {
      id_estudiante: idStudent,
      tipo_categoria: typeCategory,
      fecha: date
    });
  }

  getCognitiveFollowUp(idStudent: number, typeCategory: number, date: string) {
    return this.http.post<any>(API + "/seguimientos/", {
      id_estudiante: idStudent,
      tipo_categoria: typeCategory,
      fecha: date
    });
  }

  updateFollowUP(
    idStudent: number,
    idCategory: number,
    date: string,
    accumulator: number
  ) {
    return this.http.put<any>(API + "/seguimientos/", {
      id_estudiante: idStudent,
      id_categoria: idCategory,
      fecha: date,
      acumulador: accumulator
    });
  }

  insertCategoryData(idGroup: number, date: string) {
    return this.http.post<any>(API + "/seguimientoxestudiante/", {
      id_grupo: idGroup,
      fecha: date
    });
  }

  insertAssistances(idGroup: number, date: string) {
    return this.http.post<any>(API + "asistencias/", {
      id_grupo: idGroup,
      fecha: date
    });
  }
  getAssistances(idGroup: number, date: string) {
    return this.http.get<any>(
      API + "asistencias?" + "id_grupo=" + idGroup + "&fecha=" + date
    );
  }

  updateAssistances(
    idGroup: number,
    idStudent: number,
    date: string,
    assistance: number
  ) {
    return this.http.put<any>(API + "asistencias/", {
      id_grupo: idGroup,
      id_estudiante: idStudent,
      fecha: date,
      asistencia: assistance
    });
  }
}
