import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUsuarioGPD } from "../pages/interfaces/interfaces";
import { IUsuarioP } from "../pages/interfaces/interfaces";
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
    actualizarUsuario(id: number, usuario: IUsuarioP): Observable<IUsuarioGPD> {
        return this.http.put<IUsuarioGPD>(`${this.apiUrl}/usuarios/${id}`, usuario);
    }
    eliminarUsuario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
    }
    listarUsuarios(): Observable<IUsuarioGPD[]> {
        return this.http.get<IUsuarioGPD[]>(`${this.apiUrl}/usuarios`);
    }
    buscarUsuarioPorId(id: number): Observable<IUsuarioGPD> {
        return this.http.get<IUsuarioGPD>(`${this.apiUrl}/usuarios/${id}`);
    }
}