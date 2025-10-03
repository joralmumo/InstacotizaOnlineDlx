import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUsuarioGPD } from "../pages/interfaces/interfaces";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpclient: HttpClient) { }

// En tu auth.service.ts
GetUserById(correo: any): Observable<any> {
  return this.httpclient.get(`${environment.apiUrl}/usuarios/?correo=${correo}`);
}

// Nuevo método para login
login(credentials: { correo: string; contrasena: string; }): Observable<any> {
  return this.httpclient.post(
    `${environment.apiUrl}/usuarios/login`,
    credentials
  );
}

// Nuevo método para registro
register(user: any): Observable<any> {
  return this.httpclient.post(`${environment.apiUrl}/usuarios/register`, user);
}

IsLogged(){
  return sessionStorage.getItem('correo')!=null;
}

}