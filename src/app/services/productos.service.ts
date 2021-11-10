import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://miweb-angular-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
    .subscribe( (resp: any) => {
      this.productos = resp
      this.cargando = false;
    });
  }
}
