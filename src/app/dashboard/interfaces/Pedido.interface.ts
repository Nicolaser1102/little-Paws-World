import { NombrePaquete } from "./paquete.enum";

export interface Pedido {

  nombreMascota: string;

  direccion: string;

  paquete: NombrePaquete;

  id_user: string;

}
