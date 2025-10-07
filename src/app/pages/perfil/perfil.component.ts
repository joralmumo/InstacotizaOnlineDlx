import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUsuarioGPD } from '../interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  
  usuario: IUsuarioGPD | null = null;
  cargando = true;
  editandoPerfil = false;
  
  // Variables para edición
  usuarioEditado: Partial<IUsuarioGPD> = {};
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
          this.usuarioEditado = { ...this.usuario };
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.cargando = false;
      }
    });
  }

  iniciarEdicion() {
    this.editandoPerfil = true;
    this.usuarioEditado = { ...this.usuario };
  }

  cancelarEdicion() {
    this.editandoPerfil = false;
    this.usuarioEditado = { ...this.usuario };
  }

  guardarCambios() {
    // Aquí implementarías la lógica para guardar los cambios
    // Por ahora solo simulamos el guardado
    console.log('Guardando cambios:', this.usuarioEditado);
    
    if (this.usuario) {
      this.usuario = { ...this.usuario, ...this.usuarioEditado };
    }
    
    this.editandoPerfil = false;
    
    // Aquí podrías llamar a un servicio para actualizar los datos
    // this.userService.actualizarPerfil(this.usuarioEditado).subscribe(...)
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
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
