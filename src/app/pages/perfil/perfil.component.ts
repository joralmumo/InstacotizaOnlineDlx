import { Component } from '@angular/core';
import { IUsuarioGPD } from '../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApicrudService } from '../../services/apicrud.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  usuario: IUsuarioGPD | null = null;
  cargando = true;
  editandoPerfil = false;

  constructor(private authService: AuthService, 
              private router: Router,
              private api: ApicrudService,
              private formBuilder: FormBuilder) {
                this.usuarioEditor = this.formBuilder.group({
                  nombre: [''],
                  correo: ['']
                });
              }

  usuarioEditor: FormGroup;
  usuarioEditado: IUsuarioGPD | null = null;



  ngOnInit() {
    this.cargarPerfilUsuario();
  }

  cargarPerfilUsuario() {
    const correoUsuario = sessionStorage.getItem('correo');
    
    if (!correoUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.GetUserById(correoUsuario).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.usuario = response[0];
          if (this.usuario) {
            this.usuarioEditado = {
              id: this.usuario.id,
              nombre: this.usuario.nombre || '',
              correo: this.usuario.correo || '',
              contrasena: this.usuario.contrasena || '',
              rol: this.usuario.rol || '',
              isactive: this.usuario.isactive || false,
              cotizaciones: this.usuario.cotizaciones || []
            };
          }
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.cargando = false;
      }
    });
  }

  guardarCambios() {
    const userId = sessionStorage.getItem('id');
   if (userId && this.usuarioEditado) {
      
      this.api.actualizarUsuario(userId, this.usuarioEditado).subscribe();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  iniciarEdicion() {
    this.editandoPerfil = true;
    if (this.usuario) {
      this.usuarioEditado = { ...this.usuario };
    }
  }

  cancelarEdicion() {
    this.editandoPerfil = false;
    if (this.usuario && this.usuario.id) {
      this.usuarioEditado = {
        id: this.usuario.id,
        nombre: this.usuario.nombre || '',
        correo: this.usuario.correo || '',
        contrasena: this.usuario.contrasena || '',
        rol: this.usuario.rol || '',
        isactive: this.usuario.isactive || false,
        cotizaciones: this.usuario.cotizaciones || []
      };
    }
  }

  obtenerIniciales(): string {
    if (!this.usuario?.nombre) return 'U';
    
    const nombres = this.usuario.nombre.split(' ');
    if (nombres.length >= 2) {
      return (nombres[0][0] + nombres[1][0]).toUpperCase();
    }
    return nombres[0][0].toUpperCase();
  }
}
