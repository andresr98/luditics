import { Injectable } from "@angular/core";
import { isNil } from "lodash";

@Injectable()
export class UtilitiesProvider {
  emptyStudent: any = {};
  constructor() {}

  sortStudents(data: any[]): any[][] {
    return data.reduce<any[][]>((accumulator, student, index) => {
      const row = student.grupoxestudiante__fila;
      const column = student.grupoxestudiante__columna;

      if (isNil(accumulator[row])) {
        accumulator[row] = new Array(6);
      }
      accumulator[row][column] = student;
      return accumulator;
    }, []);
  }

  setEmptyStudent(data: any[][]) {
    let rows = data.length;
    let columns = 6;
    for (let i = 0; i < rows; i++) {
      data[i] = data[i] || new Array(6);
      for (let j = 0; j < columns; j++) {
        if (data[i][j] == undefined) {
          this.emptyStudent = { empty: true };
          data[i][j] = this.emptyStudent;
        }
      }
    }
    return data;
  }
}
