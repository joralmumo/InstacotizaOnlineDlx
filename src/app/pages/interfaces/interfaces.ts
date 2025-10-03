//GPD: Interfaces para Get, put, delete
//P: Interfaces para Post

export interface IUsuarioGPD{
    id: number;
    nombre: string;
    correo: string;
    contrasena: string;
    rol: string;
    isactive: boolean;
    cotizaciones: any[];
}

export interface IUsuarioP{
    nombre: string;
    correo: string;
    contrasena: string;
    rol: string;
    isactive: boolean;
    cotizaciones: any[];
}