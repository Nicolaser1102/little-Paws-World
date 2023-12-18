import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Pedido } from '../dashboard/interfaces/Pedido.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }


  private readonly baseUrl: string = environment.pedidosBackEndUrl;
  private http = inject (HttpClient);

  private _pedido = signal<Pedido | null>(null);


  registarPedido(pedido:Pedido): Observable<Pedido>{


    const url = `${ this.baseUrl}/lista-pedidos`;
    const body = {
      nombreMascota: pedido.nombreMascota,
      direccion: pedido.direccion,
      paquete: pedido.paquete,
      id_user: pedido.id_user
    };

    console.log(body);

    return this.http.post<Pedido>(url, body);
  }


  eliminarPedido(id:string): Observable<boolean>{

    if(!id) return of(false);

    console.log("El id a borrar es:", id);

    return this.http.delete(`${this.baseUrl}/lista-pedidos/${id}`)
    .pipe(
          map( resp => true),
          catchError(err => of(false)),
    );
  }




}
