export interface Student {
  id: number;
  nombres: string;
  apellidos: string;
  posicion: [number, number];
  grupoxestudiante__fila: number;
  grupoxestudiante__columna: number;
  sexo_biologico: number;
  descripcion: string;
  changed: boolean;
  ubicationClass: String;
  categoria__id: number;
  categoria__nombre: string;
  categoria__icono: string;
  acumulador: number;
  grupoxestudiante__estudiante_id__id: number;
  grupoxestudiante__estudiante_id__nombres: string;
  grupoxestudiante__estudiante_id__apellidos: string;
  asistencia: number;
  asistenciaClass: string;
}
