import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise<void>((resolve, reject) => {
      this.http.get('https://miweb-angular-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos = resp
        this.cargando = false;
        resolve();
      });
    });

  }

  getProducto (id: string) {
    return this.http.get(`https://miweb-angular-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
  }

  buscarProducto (texto: string) {

    if (this.productos.length === 0) {
      this.cargarProductos().then(() =>{
        this.filtrarProductos(texto);
      });
    } else {
      this.filtrarProductos(texto);
    }
  }

  private filtrarProductos(texto: string) {
    this.productosFiltrado = [];
    texto = texto.toLocaleLowerCase();
    this.productos.forEach(prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(texto) >= 0 || tituloLower.indexOf(texto) >=0) {
        this.productosFiltrado.push(prod);
      }
    })
  }
}
