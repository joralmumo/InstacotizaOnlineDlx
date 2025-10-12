import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUsuarioGPD } from "../pages/interfaces/interfaces";
import { IUsuarioP, ICotizacion, IProducto } from "../pages/interfaces/interfaces";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApicrudService{
    private apiUrl = environment.apiUrl; //definir api del mongo!!
    constructor(private http: HttpClient) {}

    //Crud Usuario
    crearUsuario(usuario: IUsuarioP): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/register`, usuario);
    }
    actualizarUsuario(userId: string, usuario: IUsuarioGPD): Observable<IUsuarioGPD> {
        return this.http.put<IUsuarioGPD>(`${this.apiUrl}/usuarios/${userId}`, usuario);
    }
    eliminarUsuario(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
    }
    listarUsuarios(): Observable<IUsuarioGPD[]> {
        return this.http.get<IUsuarioGPD[]>(`${this.apiUrl}/usuarios`);
    }
    buscarUsuarioPorId(id: string): Observable<IUsuarioGPD> {
        return this.http.get<IUsuarioGPD>(`${this.apiUrl}/usuarios/${id}`);
    }

    agregarCotizacion(userId: string, cotizacion: ICotizacion): Observable<any> {
        return this.http.post(`${environment.apiUrl}/usuarios/${userId}/cotizaciones`, cotizacion);
    }

    eliminarCotizacion(userId: string, cotizacionIndex: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/usuarios/${userId}/cotizaciones/${cotizacionIndex}`);
    }

    actualizarCotizacion(userId: string, nro_cotizacion: string, cotizacion: ICotizacion): Observable<any> {
        return this.http.put(`${environment.apiUrl}/usuarios/${userId}/cotizaciones/${nro_cotizacion}`, cotizacion);
    }
}