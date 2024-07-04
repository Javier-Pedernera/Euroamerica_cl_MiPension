export interface Datos {
  cambiarClave: boolean;
  id: number;
  rut: string;
  dv: string;
  nombre: string;
  paterno: string;
  materno: string;
  email: string;
  celular: string;
  telefono: string;
  rut1: string;
  clave: string;
}

export interface CredencialesHuella {
  rut: string;
  clave: string;
}

export interface LoginResponse {
  Token: string;
  datos: Datos;
  mensaje: string;
  success: boolean;
}

export interface PolizaResponse {
  mensaje: string;
  polizas: string[];
  success: boolean;
}

export interface MisDatos {
  autoriza: boolean;
  celular: string;
  direccion: string;
  email: string;
  formaPago: string;
  numeroCuenta: string;
  rut: string;
  telefono: string;
  idComuna: string;
}

export interface MisDatosResponse {
  datos: MisDatos;
  mensaje: string;
  success: boolean;
}

export interface AniosResponse {
  mensaje: string;
  anios: number[];
  success: boolean;
}

export interface Pago {
  mes: string;
  diaSemana: string;
  dia: number;
}

export interface CalendarioResponse {
  pagos: Pago[];
  mensaje: string;
  success: boolean;
}

export interface Localidad {
  id: number;
  nombre: string;
}

export interface CentroAtencionResponse {
  mensaje: string;
  success: boolean;
  loc: Localidad[];
}

export interface Sucursal {
  id: number;
  direccion: string;
  horarios: string[];
  telefono: string;
  latitud: string;
  longitud: string;
}

export interface SucursalResponse {
  mensaje: string;
  success: boolean;
  loc: Sucursal;
}

export interface Notificacion {
  id: number;
  titulo: string;
  fecha: string;
  leido: boolean;
}

export interface Notificaciones {
  mensaje: string;
  success: boolean;
  Notificaciones: Notificacion[];
}

export interface NotificacionBase64 {
  mensaje: string;
  success: boolean;
  NotificacionB64: string;
}

// export class Datos {
//     cambiarClave: boolean;
//     id: number;
//     rut: string;
//     dv: string;
//     nombre: string;
//     paterno: string;
//     materno: string;
//     email: string;
//     celular: string;
//     telefono: string;
//     rut1: string;
//     clave: string;
// }

// export class CredencialesHuella {
//     rut: string;
//     clave: string;
// }

// export class LoginResponse {
//     Token: string;
//     datos: Datos;
//     mensaje: string;
//     success: boolean;
// }

// export class PolizaResponse {
//     mensaje: string;
//     polizas: Array<string>;
//     success: boolean;
// }

// export class MisDatos {
//     autoriza: boolean;
//     celular: string;
//     direccion: string;
//     email: string;
//     formaPago: string;
//     numeroCuenta: string;
//     rut: string;
//     telefono: string;
//     idComuna: string;
// }

// export class MisDatosResponse {
//     datos: MisDatos;
//     mensaje: string;
//     success: boolean;
// }

// export class AniosResponse {
//     mensaje: string;
//     anios: Array<number>;
//     success: boolean;
// }

// export class Pago  {
//     mes: string;
//     diaSemana: string;
//     dia: number;
// }

// export class CalendarioResponse {
//     pagos: Array<Pago>;
//     mensaje: string;
//     success: boolean;
// }

// export class Localidad {
//     id: number;
//     nombre: string;
// }

// export class CentroAtencionResponse {
//     mensaje: string;
//     success: boolean;
//     loc: Array<Localidad>;
// }

// export class Sucursal {
//     id: number;
//     direccion: string;
//     horarios: Array<string>;
//     telefono: string;
//     latitud: string;
//     longitud: string;
// }

// export class SucursalResponse {
//     mensaje: string;
//     success: boolean;
//     loc: Sucursal;
// }

// export class Notificacion {
//     id: number;
//     titulo: string;
//     fecha: string;
//     leido: boolean;
// }

// export class Notificaciones {
//     mensaje: string;
//     success: boolean;
//     Notificaciones: Array<Notificacion>
// }

// export class NotificacionBase64 {
//     mensaje: string;
//     success: boolean;
//     NotificacionB64: string;
// }
